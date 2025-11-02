import React from 'react';
import './Navigation.css';

const Navigation = ({ 
  currentQuestion, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onSubmit,
  answers 
}) => {
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="navigation-container">
      <div className="progress-info">
        <span className="answered-count">
          Answered: {answeredCount} / {totalQuestions}
        </span>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          className="nav-button"
          onClick={onPrevious}
          disabled={isFirstQuestion}
        >
          ← Previous
        </button>

        {isLastQuestion ? (
          <button
            className="nav-button submit-button"
            onClick={onSubmit}
          >
            Submit Test
          </button>
        ) : (
          <button
            className="nav-button"
            onClick={onNext}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
