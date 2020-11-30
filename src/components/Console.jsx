import React from 'react';
import PropTypes from 'prop-types';

const Console = (props) => {
  const { consoleValue } = props;
  return (
    <div className="console-wrapper">
      <div className="console-container">
        { consoleValue && consoleValue.length > 0 ? `Output: ${consoleValue}` : ''}
      </div>
    </div>
  );
};

Console.propTypes = {
  consoleValue: PropTypes.string.isRequired,
};

export default Console;
