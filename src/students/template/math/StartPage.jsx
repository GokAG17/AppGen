import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./StartPage.css";

const StartPage = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/student/temp3/ship-selection");
  };

  const handleDoubleClick = () => {
    startGame();
  };

  return (
    <div className="startPageContainer" onClick={handleDoubleClick}>
      <h2>Math Game !</h2>

      <Button
        className="startPageButton"
        type="primary"
        size="large"
        onClick={startGame}
      >
        Start Game
      </Button>

      <div className="typewriter3-container">
        <Typewriter
          onInit={(writer) => {
            writer
              .typeString("Prepare your aim, soldier!")
              .pauseFor(500)
              .typeString("<br />")
              .pauseFor(500)
              .typeString("<br />Click to start the battle")
              .start();
          }}
        />
      </div>
    </div>
  );
};

export default StartPage;
