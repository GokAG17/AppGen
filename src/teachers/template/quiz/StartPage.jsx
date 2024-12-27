import React from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./StartPage.css";

function StartPage() {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/temp1/quiz");
  };

  // This function will trigger the startQuiz when double-clicked anywhere
  const handleDoubleClick = () => {
    startQuiz();
  };

  return (
    <div className="start1-page" onDoubleClick={handleDoubleClick}>
      <div className="background-overlay"></div>
      <div className="main1-content">
        <h1 className="start1-page__title">Quiz App</h1>
        <p className="start1-page__description">
          Test your knowledge with this interactive quiz !
        </p>
        <button className="start1-page__button" onDoubleClick={startQuiz}>
          Start Quiz
        </button>
        <div className="typewriter1-container">
          <Typewriter
            onInit={(writer) => {
              writer
                .typeString("Ready to challenge yourself ?")
                .pauseFor(1000)
                .typeString("<br />Double click to start")
                .start();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StartPage;
