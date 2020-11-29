import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import axios from 'axios';
import { Languages } from './Constants';
import CodeEditorHeader from './CodeEditorHeader';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-javascript';

/*
  Languages:
  0 -> python
  1 -> C++
  2 -> JavaScript
  3 -> Java
*/

const CodeEditor = (props) => {
  const { setTerminalValue } = props;
  const [textValue, setTextValue] = useState('');
  const [language, setLanguage] = useState(Languages[0]);

  const handleRun = () => {
    axios.post('http://localhost:5000/run_code', { code: textValue, language_id: language.id })
      .then((response) => { setTerminalValue(response.data.stdout); })
      .catch((error) => { console.log(error); });
  };

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
  setTerminalValue: PropTypes.func.isRequired,
};

export default CodeEditor;
