import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import SplitPane from 'react-split-pane';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const Editor = () => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('python');

  useEffect(() => {
    console.log(JSON.stringify(value));
  }, [value]);

  return (
    <SplitPane split="vertical" minSize="50%">
      <AceEditor
        height="100%"
        width="100%"
        mode={language}
        theme="monokai"
        fontSize={14}
        showPrintMargin
        showGutter
        highlightActiveLine
        value={value}
        onChange={setValue}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
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
