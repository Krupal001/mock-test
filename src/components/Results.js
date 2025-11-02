import React from 'react';
import './Results.css';

const Results = ({ answers, questions, onRestart }) => {
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = ((score / questions.length) * 100).toFixed(1);
  const passed = percentage >= 50;

  return (
    <div className="results-container">
      <div className="results-card">
        <h1 className="results-title">Test Completed!</h1>
        
        <div className={`score-display ${passed ? 'passed' : 'failed'}`}>
          <div className="score-number">{score}</div>
          <div className="score-total">out of {questions.length}</div>
          <div className="score-percentage">{percentage}%</div>
        </div>

        <div className="results-status">
          {passed ? (
            <div className="status-message passed">
              ✓ Congratulations! You passed the test.
            </div>
          ) : (
            <div className="status-message failed">
              ✗ You need to score at least 50% to pass.
            </div>
          )}
        </div>

        <div className="results-breakdown">
          <div className="breakdown-item">
            <span className="breakdown-label">Correct Answers:</span>
            <span className="breakdown-value correct">{score}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Wrong Answers:</span>
            <span className="breakdown-value wrong">{questions.length - score}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Total Questions:</span>
            <span className="breakdown-value">{questions.length}</span>
          </div>
        </div>

        <button className="restart-button" onClick={onRestart}>
          Take Test Again
        </button>

        <div className="review-section">
          <h2 className="review-title">Answer Review</h2>
          <div className="review-list">
            {questions.map((question) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              const wasAnswered = userAnswer !== undefined;

              return (
                <div key={question.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="review-header">
                    <span className="review-question-number">Q{question.id}</span>
                    <span className={`review-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                  <p className="review-question-text">{question.question}</p>
                  {wasAnswered && (
                    <p className="review-answer">
                      <strong>Your answer:</strong> {question.options[userAnswer]}
                    </p>
                  )}
                  {!isCorrect && (
                    <p className="review-correct-answer">
                      <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
