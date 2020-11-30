import React from 'react';
import PropTypes from 'prop-types';
import ConsoleLoader from './ConsoleLoader';

const Console = ({ consoleValue, consoleIsLoading }) => {
  let displayItem;
  if (consoleIsLoading) {
    displayItem = <ConsoleLoader />;
  } else if (consoleValue && consoleValue.length > 0) {
    displayItem = `${consoleValue}`;
  } else {
    displayItem = '';
  }

  return (
    <div className="console-wrapper">
      <div className="console-container">
        <div className="console-header">
          <h4>Console</h4>
        </div>
        <code className="console">
          { displayItem }
        </code>
      </div>
    </div>
  );
};

Console.propTypes = {
  consoleValue: PropTypes.string.isRequired,
  consoleIsLoading: PropTypes.bool.isRequired,
};

export default Console;
