import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CompletePage.css";

const CompletePage = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("restart");
  const [intervalId, setIntervalId] = useState(null);

  const handleRestart = () => {
    navigate("/student/temp2");
  };

  const handleGoHome = () => {
    navigate("/student/temp");
  };

  const toggleActiveButton = () => {
    setActiveButton((prev) => (prev === "restart" ? "home" : "restart"));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      toggleActiveButton();
    }, 2000);

    setIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (
        !event.target.closest(".restart-button") &&
        !event.target.closest(".home-button")
      ) {
        handleButtonClick(activeButton);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [activeButton]);

  const handleButtonClick = (button) => {
    if (button === "restart") {
      handleRestart();
    } else if (button === "home") {
      handleGoHome();
    }
  };

  return (
    <div className="complete-page">
      <h1>Congratulations!</h1>
      <p>You have completed the quiz.</p>

      <button
        onClick={handleRestart}
        className={`restart-button ${
          activeButton === "restart" ? "active" : ""
        }`}
      >
        Restart Quiz
      </button>

      <button
        onClick={handleGoHome}
        className={`home-button ${activeButton === "home" ? "active" : ""}`}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default CompletePage;
