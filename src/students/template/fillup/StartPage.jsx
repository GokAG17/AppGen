import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./StartPage.css";

const StartPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/student/temp2/fill-up");
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      handleStartQuiz();
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div className="start2-page">
      <h1 className="start2-page__title">Fill Ups</h1>
      <p className="start2-page__description">
        Test your knowledge by filling in the blanks!
      </p>
      <button onClick={handleStartQuiz} className="start2-button">
        Start
      </button>
      <div className="typewriter-container">
        <Typewriter
          onInit={(writer) => {
            writer
              .typeString("To Start your journey")
              .pauseFor(1000)
              .typeString("<br />Double click")
              .start();
          }}
        />
      </div>
    </div>
  );
};

export default StartPage;
