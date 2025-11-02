import React, { useState, useCallback } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import Navigation from './components/Navigation';
import Timer from './components/Timer';
import Results from './components/Results';
import Sidebar from './components/Sidebar';
import { questions } from './data/questions';

const TEST_DURATION = 3600; // 60 minutes in seconds

function App() {
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleStartTest = () => {
    setTestStarted(true);
    setTestCompleted(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestions([]);
    setSidebarOpen(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the test? You cannot change your answers after submission.')) {
      setTestCompleted(true);
    }
  };

  const handleTimeUp = useCallback(() => {
    alert('Time is up! The test will be submitted automatically.');
    setTestCompleted(true);
  }, []);

  const handleRestart = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestions([]);
  };

  const handleToggleFlag = (questionId) => {
    setFlaggedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      }
      return [...prev, questionId];
    });
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  if (!testStarted) {
    return <StartScreen onStart={handleStartTest} />;
  }

  if (testCompleted) {
    return (
      <Results
        answers={answers}
        questions={questions}
        onRestart={handleRestart}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  return (
    <div className={`app ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {sidebarOpen && (
        <Sidebar
          questions={questions}
          currentQuestion={currentQuestionIndex}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          onQuestionSelect={setCurrentQuestionIndex}
          onToggleFlag={handleToggleFlag}
          onToggleSidebar={handleToggleSidebar}
        />
      )}

      <div className="app-content">
        <header className="app-header">
          <div className="header-content">
            {!sidebarOpen && (
              <button className="sidebar-toggle" onClick={handleToggleSidebar}>
                ☰ Questions
              </button>
            )}
            <h1 className="app-title">Mock Test</h1>
            <Timer duration={TEST_DURATION} onTimeUp={handleTimeUp} />
          </div>
        </header>

        <main className="app-main">
        <Question
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          isFlagged={flaggedQuestions.includes(currentQuestion.id)}
          onToggleFlag={() => handleToggleFlag(currentQuestion.id)}
        />

        <Navigation
          currentQuestion={currentQuestionIndex}
          totalQuestions={questions.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          answers={answers}
        />
        </main>

        <footer className="app-footer">
          <div className="question-grid">
            {questions.map((q, index) => (
              <button
                key={q.id}
                className={`question-number ${
                  index === currentQuestionIndex ? 'active' : ''
                } ${answers[q.id] !== undefined ? 'answered' : ''} ${
                  flaggedQuestions.includes(q.id) ? 'flagged' : ''
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {q.id}
              </button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
