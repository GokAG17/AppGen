import React, { useState, useEffect, useRef } from "react";
import { TrophyOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Typography } from "antd";
import Road from "./games/Road.jsx";
import Flashcard from "./games/FlashCard.jsx";
import { Mosaic } from "react-loading-indicators";
import "./Racing.css";

const { Text } = Typography;

const RacingGameWithLearning = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [carPosition, setCarPosition] = useState(0);
  const [flashcardVisible, setFlashcardVisible] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardTimer, setFlashcardTimer] = useState(null);
  const [direction, setDirection] = useState(1);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(40);
  const [gameEnded, setGameEnded] = useState(false);
  const [activeButton, setActiveButton] = useState("home");
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        setHighlightedIndex((prevIndex) => (prevIndex + 1) % 2);
      } else if (e.key === "ArrowUp") {
        setHighlightedIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
      } else if (e.key === "Enter") {
        handleButtonClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [highlightedIndex]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const fetchFlashcards = async () => {
      try {
        const response = await fetch("/flashcards.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    let timerInterval;

    if (!isLoading && !isGamePaused && !gameEnded) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerInterval);
            handleGameEnd();
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isLoading, isGamePaused, gameEnded]);

  const handleClick = () => {
    if (!isGamePaused && !gameEnded) {
      setCarPosition((prevPosition) => {
        if (direction === 1) {
          if (prevPosition === 0) return 1;
          if (prevPosition === 1) return 2;
          if (prevPosition === 2) {
            setDirection(-1);
            return 1;
          }
        } else if (direction === -1) {
          if (prevPosition === 0) {
            setDirection(1);
            return 1;
          }
          if (prevPosition === 1) return 0;
          if (prevPosition === 2) return 1;
        }

        return prevPosition;
      });
    }
  };

  const handleCollision = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const handleMissedCoin = () => {
    if (flashcards.length > 0) {
      const randomCard =
        flashcards[Math.floor(Math.random() * flashcards.length)];
      setCurrentFlashcard(randomCard);
      setFlashcardVisible(true);
      setIsGamePaused(true);

      const timer = setTimeout(() => {
        handleFlashcardCompletion();
      }, 7000);
      setFlashcardTimer(timer);
    }
  };

  const handleFlashcardCompletion = () => {
    setFlashcardVisible(false);
    setIsGamePaused(false);
    if (flashcardTimer) clearTimeout(flashcardTimer);
  };

  const handleGameEnd = () => {
    setGameEnded(true);
    setIsGamePaused(true);
    setShowCongratsModal(true);
  };

  const handleRetry = () => {
    navigate("/temp4");
  };

  const handleGoHome = () => {
    navigate("/teacher/home");
  };

  useEffect(() => {
    let shiftTimer;
    if (showCongratsModal) {
      shiftTimer = setInterval(() => {
        setActiveButton((prev) => (prev === "home" ? "retry" : "home"));
      }, 5000);
    }
    return () => clearInterval(shiftTimer);
  }, [showCongratsModal]);

  const handleButtonClick = () => {
    if (activeButton === "home") {
      handleGoHome();
    } else {
      handleRetry();
    }
  };

  useEffect(() => {
    if (showCongratsModal) {
      const globalClickHandler = () => {
        handleButtonClick();
      };

      window.addEventListener("click", globalClickHandler);

      return () => {
        window.removeEventListener("click", globalClickHandler);
      };
    }
  }, [showCongratsModal, handleButtonClick]);

  if (isLoading) {
    return (
      <div className="fullscreen-loader">
        <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
      </div>
    );
  }

  return (
    <div onClick={handleClick} className="rgl-game">
      <div className="rgl-background"></div>

      <div className="score-timer">
        <div className="score">
          <TrophyOutlined style={{ marginRight: "8px", fontSize: "24px" }} />
          Score: {score}
        </div>
        <div className="timer">
          <ClockCircleOutlined
            style={{ marginRight: "8px", fontSize: "24px" }}
          />
          Time: {time} s
        </div>
      </div>

      <Road
        isGamePaused={isGamePaused}
        carPosition={carPosition}
        onCollision={handleCollision}
        onMissedCoin={handleMissedCoin}
      >
        {flashcardVisible && currentFlashcard && (
          <Flashcard
            flashcards={[currentFlashcard]}
            onAnswer={handleFlashcardCompletion}
          />
        )}
      </Road>

      <Modal
        title={
          <span className="modal-title">
            <TrophyOutlined style={{ marginRight: "8px", color: "gold" }} />
            Congratulations!
          </span>
        }
        open={showCongratsModal}
        footer={[
          <Button
            key="home"
            type={activeButton === "home" ? "primary" : "default"}
            onClick={handleButtonClick}
          >
            Home
          </Button>,
          <Button
            key="retry"
            type={activeButton === "retry" ? "primary" : "default"}
            onClick={handleButtonClick}
          >
            Retry
          </Button>,
        ]}
        width={600}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Text style={{ fontSize: "24px", fontWeight: "bold" }}>
            Your final score is: {score}
          </Text>
          <TrophyOutlined
            style={{ fontSize: "48px", color: "gold", marginTop: "10px" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default RacingGameWithLearning;
