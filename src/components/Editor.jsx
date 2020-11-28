import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import CodeEditor from './CodeEditor';

const Editor = () => {
  const [terminalValue, setTerminalValue] = useState('');

  return (
    <SplitPane split="vertical" minSize="40%" allowResize={false}>
      Problem description goes here
      <SplitPane split="horizontal" minSize="70%">
        <CodeEditor setTerminalValue={setTerminalValue} />
        <div>
          {terminalValue}
        </div>
      </SplitPane>
    </SplitPane>
  );
};

export default Editor;
