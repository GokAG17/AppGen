import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CompletedPage.css";

function CompletedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state || {
    score: 0,
    totalQuestions: 0,
  };

  const [activeButton, setActiveButton] = useState("try-again");
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveButton((prev) =>
        prev === "try-again" ? "go-home" : "try-again"
      );
    }, 2000);

    setTimeoutId(intervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const handleGlobalClick = () => {
      handleButtonClick(activeButton);
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [activeButton]);

  const handleButtonClick = (button) => {
    if (button === "try-again") {
      restartQuiz();
    } else if (button === "go-home") {
      goToHomepage();
    }
  };

  const restartQuiz = () => {
    navigate("/student/temp1");
  };

  const goToHomepage = () => {
    navigate("/student/temp");
  };

  return (
    <div className="completed-page">
      <h1 className="completed-page__title">Quiz Completed!</h1>
      <p className="completed-page__score">
        You scored {score} out of {totalQuestions}.
      </p>
      <p className="completed-page__message">
        {score / totalQuestions >= 0.8
          ? "Great job! You have a solid understanding."
          : score / totalQuestions >= 0.5
          ? "Good effort! Keep practicing to improve."
          : "Don't worry! Review the material and try again."}
      </p>
      <div className="completed-page__buttons">
        <button
          className={`completed-page__button ${
            activeButton === "try-again" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("try-again")}
        >
          Try Again
        </button>
        <button
          className={`completed-page__button completed-page__button--secondary ${
            activeButton === "go-home" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("go-home")}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default CompletedPage;
