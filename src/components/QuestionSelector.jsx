import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useMondaySDK } from './MondaySDKContext';
import { GET_ITEMS } from './Queries';

const QuestionSelector = () => {
  const [questions, setQuestions] = useState([]);
  const monday = useMondaySDK();
  const [selectedQuestion, setSelectedQuestion] = useState({});

  const handleSelect = (value) => {
    setSelectedQuestion(questions[value]);
  };

  useEffect(() => {
    let questionBoard = null;

    monday
      .api(GET_ITEMS)
      .then((res) => {
        const { boards } = res.data;
        for (let i = 0; i < boards.length; i += 1) {
          if (boards[i].name === 'Questions') {
            questionBoard = boards[i].items;
            break;
          }
        }

        if (!questionBoard) {
          console.log('Questions board not found.');
          return;
        }
        setQuestions(questionBoard);
        setSelectedQuestion(questionBoard[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="secondary">
          {selectedQuestion.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {questions.map((question, index) => (
            <Dropdown.Item
              key={question.id}
              eventKey={index}
            >
              {question.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>

  );
};

export default QuestionSelector;
