import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown } from 'react-bootstrap';
import { Languages } from './Constants';
import { languageShape } from './PropTypeShapes';

const CodeEditorHeader = (props) => {
  const { setLanguage, selectedLanguage, handleRun } = props;

  const handleSelect = (value) => {
    setLanguage(Languages[value]);
  };

  return (
    <div className="code-editor-header">
      <Button variant="outline-success" onClick={handleRun}>Run</Button>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="secondary">
          {selectedLanguage.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          { Languages.map((language, index) => (
            <Dropdown.Item
              key={language.id}
              eventKey={index}
            >
              {language.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

CodeEditorHeader.propTypes = {
  selectedLanguage: PropTypes.objectOf(languageShape).isRequired,
  setLanguage: PropTypes.func.isRequired,
  handleRun: PropTypes.func.isRequired,
};

export default CodeEditorHeader;
