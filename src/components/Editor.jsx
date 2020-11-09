import React, { useState } from 'react';
import AceEditor from 'react-ace';
import SplitPane from 'react-split-pane';
import axios from 'axios';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import { languages } from './Constants';

const Editor = () => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState(languages[0]);

  const changeHandler = (codeChange) => {
    setValue(codeChange);
  };

  const handleLanguageChange = (event) => {
    setLanguage(languages[event.target.value]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/run_code', { code: value, language_id: language.id })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <SplitPane split="vertical" minSize="50%">
      <>
        <select value={language} onChange={handleLanguageChange}>
          {languages.map((lang, index) => <option value={index} key={lang.id}>{lang.name}</option>)}
        </select>
        <AceEditor
          height="95%"
          width="100%"
          mode={language.ace_name}
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
        <div>
          <button type="button" onClick={submitHandler}>Yeet</button>
        </div>
      </>
      <SplitPane split="horizontal" minSize="50%">
        <div>
          Console goes here
        </div>
        <div>
          Test cases go here
        </div>
      </SplitPane>
    </SplitPane>
  );
};

export default Editor;
