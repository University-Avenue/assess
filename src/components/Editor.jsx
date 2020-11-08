import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import axios from 'axios';

const Editor = () => {
  const [value, setValue] = useState(``);
  const [language, setLanguage] = useState('python');

  const changeHandler = (codeChange) => {
    setValue(codeChange);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/run_code', {code: value});
  }

  return (
    <div>
      <AceEditor
      mode={language}
      theme="monokai"
      fontSize={14}
      showPrintMargin
      showGutter
      highlightActiveLine
      value={value}
      onChange={changeHandler}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
    <button onClick={submitHandler}>Yeet</button>
    </div>
  );
};

export default Editor;
