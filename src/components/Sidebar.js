import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ 
  questions, 
  currentQuestion, 
  answers, 
  flaggedQuestions,
  onQuestionSelect,
  onToggleFlag,
  onToggleSidebar 
}) => {
  const [filter, setFilter] = useState('all');

  const getQuestionStatus = (questionId) => {
    if (answers[questionId] !== undefined) return 'attempted';
    return 'not-attempted';
  };

  const getFilteredQuestions = () => {
    return questions.filter(q => {
      if (filter === 'attempted') return answers[q.id] !== undefined;
      if (filter === 'not-attempted') return answers[q.id] === undefined;
      if (filter === 'flagged') return flaggedQuestions.includes(q.id);
      return true;
    });
  };

  const filteredQuestions = getFilteredQuestions();
  const attemptedCount = questions.filter(q => answers[q.id] !== undefined).length;
  const notAttemptedCount = questions.length - attemptedCount;
  const flaggedCount = flaggedQuestions.length;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Questions</h2>
        <button className="sidebar-close" onClick={onToggleSidebar}>
          ✕
        </button>
      </div>

      <div className="sidebar-stats">
        <div className="stat-item">
          <span className="stat-label">Total:</span>
          <span className="stat-value">{questions.length}</span>
        </div>
        <div className="stat-item attempted">
          <span className="stat-label">Attempted:</span>
          <span className="stat-value">{attemptedCount}</span>
        </div>
        <div className="stat-item not-attempted">
          <span className="stat-label">Not Attempted:</span>
          <span className="stat-value">{notAttemptedCount}</span>
        </div>
        <div className="stat-item flagged">
          <span className="stat-label">Flagged:</span>
          <span className="stat-value">{flaggedCount}</span>
        </div>
      </div>

      <div className="sidebar-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'attempted' ? 'active' : ''}`}
          onClick={() => setFilter('attempted')}
        >
          Attempted
        </button>
        <button
          className={`filter-btn ${filter === 'not-attempted' ? 'active' : ''}`}
          onClick={() => setFilter('not-attempted')}
        >
          Not Attempted
        </button>
        <button
          className={`filter-btn ${filter === 'flagged' ? 'active' : ''}`}
          onClick={() => setFilter('flagged')}
        >
          Flagged
        </button>
      </div>

      <div className="sidebar-legend">
        <div className="legend-item">
          <div className="legend-box current"></div>
          <span>Current</span>
        </div>
        <div className="legend-item">
          <div className="legend-box attempted"></div>
          <span>Attempted</span>
        </div>
        <div className="legend-item">
          <div className="legend-box not-attempted"></div>
          <span>Not Attempted</span>
        </div>
        <div className="legend-item">
          <div className="legend-box flagged"></div>
          <span>Flagged</span>
        </div>
      </div>

      <div className="sidebar-questions">
        {filteredQuestions.map((question, index) => {
          const status = getQuestionStatus(question.id);
          const isCurrent = questions[currentQuestion].id === question.id;
          const isFlagged = flaggedQuestions.includes(question.id);

          return (
            <div
              key={question.id}
              className={`sidebar-question ${status} ${isCurrent ? 'current' : ''} ${isFlagged ? 'flagged' : ''}`}
            >
              <button
                className="question-btn"
                onClick={() => onQuestionSelect(questions.findIndex(q => q.id === question.id))}
              >
                <span className="question-num">Q{question.id}</span>
                <span className="question-status-icon">
                  {status === 'attempted' ? '✓' : '○'}
                </span>
              </button>
              <button
                className={`flag-btn ${isFlagged ? 'active' : ''}`}
                onClick={() => onToggleFlag(question.id)}
                title={isFlagged ? 'Remove flag' : 'Flag for review'}
              >
                {isFlagged ? '🚩' : '⚑'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
