import React from 'react';
import PropTypes from 'prop-types';
import ConsoleLoader from './ConsoleLoader';

const Console = (props) => {
  const { consoleValue, isLoading } = props;

  let displayItem;
  if (isLoading) {
    displayItem = <ConsoleLoader />;
  } else if (consoleValue.length > 0) {
    displayItem = `Output:\n${consoleValue}`;
  } else {
    displayItem = 'Result of your program will appear here';
  }

  return (
    <div className="console-wrapper">
      <div className="console-container">
        <div className="console-header">
          <h4>Console</h4>
        </div>
        <div className="console">
          { displayItem }
        </div>
      </div>
    </div>
  );
};

Console.propTypes = {
  consoleValue: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Console;
