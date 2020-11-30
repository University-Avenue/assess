import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QuestionSelector from './QuestionSelector';

const Question = ({ isGuest }) => {
  const [selectedQuestion, setSelectedQuestion] = useState({
    id: '881814579',
    name: 'Delete Leaves With a Given Value',
    body: "Given a binary tree root and an integer target, delete all the leaf nodes with value target.\n\nNote that once you delete a leaf node with value target, if it's parent node becomes a leaf node and has the value target, it should also be deleted (you need to continue doing that until you can't).\n",
    examples: 'Input:\n root = [1,2,3,2,null,2,4], target = 2\nOutput:\n [1,null,3,null,4]\nExplanation:\n Leaf nodes in green with value (target = 2) are removed (Picture in left). \nAfter removing, new nodes become leaf nodes with value (target = 2) (Picture in center).',
  });

  return (
    <div>
      <div className="question-info">
        <div className="question-header">
          <QuestionSelector
            setSelectedQuestion={setSelectedQuestion}
            disabled={isGuest}
          />
          <h4>{selectedQuestion.name}</h4>
        </div>
        <p className="question-body">{selectedQuestion.body}</p>
        <div className="question-examples">
          <h5>Examples</h5>
          <code>{selectedQuestion.examples}</code>
        </div>
      </div>

    </div>
  );
};

Question.propTypes = {
  isGuest: PropTypes.bool.isRequired,
};

export default Question;
