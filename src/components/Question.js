import React from 'react';
import './Question.css';

const Question = ({ question, selectedAnswer, onAnswerSelect, isFlagged, onToggleFlag }) => {
  return (
    <div className="question-container">
      <div className="question-header">
        <h2 className="question-text">
          Question {question.id} of 50
        </h2>
        <button
          className={`flag-question-btn ${isFlagged ? 'flagged' : ''}`}
          onClick={onToggleFlag}
          title={isFlagged ? 'Remove flag' : 'Flag for review'}
        >
          {isFlagged ? '🚩 Flagged' : '⚑ Flag'}
        </button>
      </div>
      <p className="question-content">{question.question}</p>
      
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => onAnswerSelect(index)}
          >
            <span className="option-label">{String.fromCharCode(65 + index)}.</span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
