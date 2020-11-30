import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import CodeEditor from './CodeEditor';
import { ME_QUERY } from './Queries';
import { useMondaySDK } from './MondaySDKContext';
import Question from './Question';
import Console from './Console';

const Editor = () => {
  const [consoleValue, setConsoleValue] = useState('');
  const [isGuest, setIsGuest] = useState(true);
  const [consoleIsLoading, setConsoleIsLoading] = useState(false);
  const monday = useMondaySDK();

  useEffect(() => {
    monday.api(ME_QUERY)
      .then((res) => setIsGuest(res.data.me.is_guest))
      .catch((error) => console.log(error));
  }, []);

  return (
    <SplitPane split="vertical" minSize="30%" allowResize={false}>
      <Question isGuest={isGuest} />
      <SplitPane split="horizontal" minSize="60%">
        <CodeEditor setConsoleValue={setConsoleValue} isGuest={isGuest} setConsoleIsLoading={setConsoleIsLoading} />
        <Console isLoading={consoleIsLoading} consoleValue={consoleValue} />
      </SplitPane>
    </SplitPane>
  );
};

export default Editor;
