import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useMondaySDK } from './MondaySDKContext';
import { GET_ITEMS } from './Queries';
import { questionShape } from './PropTypeShapes';

const QuestionSelector = ({ selectedQuestion, setSelectedQuestion }) => {
  const [questions, setQuestions] = useState([]);
  const monday = useMondaySDK();

  const handleSelect = (value) => {
    setSelectedQuestion(questions[value]);
  };

  useEffect(() => {
    let questionBoard = null;
    const formattedQuestions = [];

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

        for (let i = 0; i < questionBoard.length; i += 1) {
          const formattedQuestion = {
            id: questionBoard[i].id,
            name: questionBoard[i].name,
          };

          for (let j = 0; j < questionBoard[i].column_values.length; j += 1) {
            if (questionBoard[i].column_values[j].title === 'Body') {
              formattedQuestion.body = JSON.parse(questionBoard[i].column_values[j].value).text;
            }
            if (questionBoard[i].column_values[j].title === 'Examples') {
              formattedQuestion.exmaples = questionBoard[i].column_values[j].value;
            }
          }
          formattedQuestions.push(formattedQuestion);
        }
        setQuestions(formattedQuestions);
        setSelectedQuestion(formattedQuestions[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary">
        {selectedQuestion ? selectedQuestion.name : null}
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
  );
};

QuestionSelector.propTypes = {
  selectedQuestion: questionShape.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
};

export default QuestionSelector;
