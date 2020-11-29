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
import useInterval from '../util/setInterval';

/*
  Languages:
  0 -> python
  1 -> C++
  2 -> JavaScript
  3 -> Java
*/

const CodeEditor = ({ setConsoleValue, isGuest, setConsoleIsLoading }) => {
  const [textValue, setTextValue] = useState('');
  const [language, setLanguage] = useState(Languages[0]);

  const socket = io.connect('ws://localhost:5000');

  // let's assume that the client page, once rendered, knows what room it wants to join
  const room = "test123";

  socket.on('connect', () => {
    // Connected, let's sign-up for to receive messages for this room
    socket.emit('room', room);
  });

  socket.on('message', (data) => {
    if (!isGuest) {
      setTextValue(data);
    }
  });

  const handleRun = () => {
    setConsoleIsLoading(true);
    axios.post('http://localhost:5000/run_code', { code: textValue, language_id: language.id })
      .then((response) => {
        setConsoleValue(response.data.stdout);
        setConsoleIsLoading(false);
      })
      .catch((error) => { console.log(error); });
  };

  const updateCodeAsInterviewee = (userInput) => {
    if (isGuest) {
      axios
        .post('http://localhost:5000/message_room/test123', { code: userInput })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  };

  useInterval(() => {
    updateCodeAsInterviewee(textValue);
  }, 5000);

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
};

export default CodeEditor;
