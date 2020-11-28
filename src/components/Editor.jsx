import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import CodeEditor from './CodeEditor';
import { ME_QUERY } from './Queries';

const Editor = ({ monday }) => {
  const [terminalValue, setTerminalValue] = useState('');
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    monday.api(ME_QUERY)
      .then((res) => setIsGuest(res.data.me.is_guest))
      .catch((error) => console.log(error));
  }, []);

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

Editor.propTypes = {
  monday: PropTypes.object.isRequired,
};

export default Editor;
