import React from 'react';
import './StartScreen.css';

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <div className="start-card">
        <h1 className="start-title">Mock Test</h1>
        <div className="start-subtitle">50 Multiple Choice Questions</div>
        
        <div className="test-info">
          <div className="info-item">
            <div className="info-icon">📝</div>
            <div className="info-content">
              <div className="info-label">Total Questions</div>
              <div className="info-value">50 MCQs</div>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">⏱️</div>
            <div className="info-content">
              <div className="info-label">Time Duration</div>
              <div className="info-value">60 Minutes</div>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">✓</div>
            <div className="info-content">
              <div className="info-label">Passing Score</div>
              <div className="info-value">50%</div>
            </div>
          </div>
        </div>

        <div className="instructions">
          <h2 className="instructions-title">Instructions</h2>
          <ul className="instructions-list">
            <li>Read each question carefully before selecting your answer</li>
            <li>You can navigate between questions using Previous/Next buttons</li>
            <li>Selected answers are saved automatically</li>
            <li>You can change your answers before submitting</li>
            <li>Click "Submit Test" when you're done to see your results</li>
            <li>The test will auto-submit when time runs out</li>
          </ul>
        </div>

        <button className="start-button" onClick={onStart}>
          Start Test
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
