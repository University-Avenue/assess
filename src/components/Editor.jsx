import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import CodeEditor from './CodeEditor';
import { ME_QUERY, USER_QUERY } from './Queries';
import { useMondaySDK } from './MondaySDKContext';
import Question from './Question';
import Console from './Console';

const Editor = () => {
  const [consoleValue, setConsoleValue] = useState('');
  const [isGuest, setIsGuest] = useState(false);
  const [viewId, setViewId] = useState('');
  const [consoleIsLoading, setConsoleIsLoading] = useState(false);
  const monday = useMondaySDK();

  useEffect(() => {
    monday.get('sessionToken').then(res => {
      let tokens = res.data.split(".");
      const userId = JSON.parse(atob(tokens[1])).dat.user_id;
      monday.api(USER_QUERY(userId)).then(res => setIsGuest(res.data.users[0].is_guest));
    });

    monday.get('context').then(res => {
      const boardViewId = res.data.boardViewId;
      setViewId(boardViewId);
    });
  }, []);

  return (
    <SplitPane split="vertical" minSize="30%" allowResize={false}>
      <Question isGuest={isGuest} />
      <SplitPane split="horizontal" minSize="60%">
        <CodeEditor setConsoleValue={setConsoleValue} isGuest={isGuest} setConsoleIsLoading={setConsoleIsLoading} viewId={viewId} />
        <Console isLoading={consoleIsLoading} consoleValue={consoleValue} />
      </SplitPane>
    </SplitPane>
  );
};

export default Editor;
