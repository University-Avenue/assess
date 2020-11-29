import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import CodeEditor from './CodeEditor';
import { ME_QUERY } from './Queries';
import { useMondaySDK } from './MondaySDKContext';
import Question from './Question';

const Editor = () => {
  const [terminalValue, setTerminalValue] = useState('');
  const monday = useMondaySDK();
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    monday.api(ME_QUERY)
      .then((res) => setIsGuest(res.data.me.is_guest))
      .catch((error) => console.log(error));
  }, []);

  return (
    <SplitPane split="vertical" minSize="40%" allowResize={false}>
      <Question isGuest={isGuest} />
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
