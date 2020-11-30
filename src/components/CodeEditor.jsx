import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Languages } from './Constants';
import CodeEditorHeader from './CodeEditorHeader';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/ext-language_tools';
import useInterval from '../util/setInterval';

/*
  Languages:
  0 -> python
  1 -> C++
  2 -> JavaScript
  3 -> Java
*/

const socket = io.connect('http://localhost:5000', { transports: ['websocket'], forceNew: true });

const CodeEditor = ({
  setConsoleValue, isGuest, setConsoleIsLoading, viewId,
}) => {
  const [textValue, setTextValue] = useState('');
  const [language, setLanguage] = useState(Languages[0]);

  const handleRun = () => {
    socket.emit('start_compile', { room: viewId });
    setConsoleIsLoading(true);
    axios.post('http://localhost:5000/run_code', { code: textValue, language_id: language.id })
      .then((response) => {
        const compilePoll = setInterval(() => {
          axios.post('http://localhost:5000/run_code_result', { code: textValue, language_id: language.id, token: response.data.token })
            .then((res) => {
              const { status } = res.data;
              const STATUS_ACCEPTED = 'Accepted';
              const STATUS_TLE = 'Time Limit Exceeded';

              const shouldExit = status.description === STATUS_ACCEPTED
                || status.description === STATUS_TLE
                || !!res.data.stderr;

              if (shouldExit) {
                if (res.data.stderr) {
                  setConsoleValue(res.data.stderr);
                  socket.emit('compile_result', { room: viewId, message: res.data.stderr });
                } else {
                  setConsoleValue(status.description === STATUS_TLE ? STATUS_TLE : res.data.stdout);
                  socket.emit('compile_result', { room: viewId, message: status.description === STATUS_TLE ? STATUS_TLE : res.data.stdout });
                }
                setConsoleIsLoading(false);
                clearInterval(compilePoll);
              }
            });
        }, 3000);
      })
      .catch((error) => { console.log(error); });
  };

  const updateCodeAsInterviewee = (userInput) => {
    if (isGuest) {
      try {
        socket.emit('user_input', { room: viewId, message: userInput });
      } catch (e) {
        console.log(e);
      }
    }
  };

  socket.on('connect', () => {
    // Connected, let's sign-up for to receive messages for this room
    socket.emit('room', viewId);
  });

  socket.on('message', (data) => {
    if (!isGuest) {
      setTextValue(data.message);
    }
  });

  socket.on('compile_started', (data) => {
    setConsoleIsLoading(true);
  });

  socket.on('compile_message', (data) => {
    setConsoleValue(data.message);
    setConsoleIsLoading(false);
  });

  socket.on('reconnect_attempt', () => {
    socket.io.opts.transports = ['polling', 'websocket'];
  });

  useInterval(() => {
    updateCodeAsInterviewee(textValue);
  }, 2000);

  return (
    <div className="code-editor-container">
      <CodeEditorHeader
        selectedLanguage={language}
        setLanguage={setLanguage}
        handleRun={handleRun}
      />
      <div className="ace-editor-container">
        <AceEditor
          height="100%"
          width="100%"
          mode={language.ace_name}
          readOnly={!isGuest}
          value={textValue}
          theme="monokai"
          fontSize={14}
          highlightActiveLine
          onChange={setTextValue}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

CodeEditor.propTypes = {
  setConsoleValue: PropTypes.func.isRequired,
  isGuest: PropTypes.bool.isRequired,
  setConsoleIsLoading: PropTypes.func.isRequired,
  viewId: PropTypes.number.isRequired,
};

export default CodeEditor;
