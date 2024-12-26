import React, { useState, useEffect } from "react";
import Road from "./games/Road.jsx";
import Flashcard from "./games/FlashCard.jsx";
import "./Racing.css";

const RacingGameWithLearning = () => {
  const [carPosition, setCarPosition] = useState(0); // 0 = Left, 1 = Center, 2 = Right
  const [flashcardVisible, setFlashcardVisible] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardTimer, setFlashcardTimer] = useState(null);
  const [direction, setDirection] = useState(1); // 1 = Forward, -1 = Backward

  useEffect(() => {
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

    return () => {
      if (flashcardTimer) {
        clearTimeout(flashcardTimer);
      }
    };
  }, [flashcardTimer]);

  const handleClick = () => {
    if (!isGamePaused) {
      setCarPosition((prevPosition) => {
        if (direction === 1) {
          if (prevPosition === 0) {
            return 1;
          }
          if (prevPosition === 1) {
            return 2;
          }
          if (prevPosition === 2) {
            setDirection(-1);
            return 1;
          }
        } else if (direction === -1) {
          if (prevPosition === 0) {
            setDirection(1);
            return 1;
          }
          if (prevPosition === 1) {
            return 0;
          }
          if (prevPosition === 2) {
            return 1;
          }
        }

        return prevPosition;
      });
    }
  };

  const handleCollision = () => {
    console.log("Collision detected! The game continues.");
  };

  const handleMissedCoin = () => {
    console.log("Coin missed! Showing flashcard.");
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
    if (flashcardTimer) {
      clearTimeout(flashcardTimer);
    }
  };

  return (
    <div onClick={handleClick} className="rgl-game">
      <div className="rgl-background"></div>
      {/* Removed the toggle direction button */}
      {/* Road component dynamically renders Car and Obstacles */}
      <Road
        isGamePaused={isGamePaused}
        carPosition={carPosition}
        onCollision={handleCollision}
        onMissedCoin={handleMissedCoin}
      >
        {/* Flashcards appear when the car misses a coin */}
        {flashcardVisible && currentFlashcard && (
          <Flashcard
            flashcards={[currentFlashcard]}
            onAnswer={handleFlashcardCompletion}
          />
        )}
      </Road>
    </div>
  );
};

export default RacingGameWithLearning;
