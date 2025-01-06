import React, { useEffect, useState } from "react";
import { Button, Modal, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ClockCircleOutlined,
  TrophyOutlined,
  CloseCircleOutlined,
  AimOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Mosaic } from "react-loading-indicators";
import "./Game.css";

const { Title, Text } = Typography;

const Game = () => {
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(5000);
  const [isGameActive, setIsGameActive] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameEndMessage, setGameEndMessage] = useState("");
  const [selectedShip, setSelectedShip] = useState("");
  const [bullets, setBullets] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [shipPosition, setShipPosition] = useState(650);
  const navigate = useNavigate();
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const gameStyle = {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    padding: "20px",
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://mcqdata.s3.eu-north-1.amazonaws.com/questions.json");
      const data = await response.json();
      console.log(data.questions);
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();

    const ship = localStorage.getItem("selectedShip");
    if (ship) {
      setSelectedShip(ship);
    }

    const handleKeyDown = (event) => {
      if (isGameActive) {
        switch (event.key) {
          case "ArrowLeft":
            setShipPosition((prev) => Math.max(prev - 10, 0));
            break;
          case "ArrowRight":
            setShipPosition((prev) =>
              Math.min(prev + 10, window.innerWidth - 100)
            );
            break;
          case " ":
            shoot();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const timer = setInterval(() => {
      if (gameTime > 0 && isGameActive) {
        setGameTime((prev) => prev - 1);
      } else if (gameTime <= 0) {
        clearInterval(timer);
        setIsGameActive(false);
        setGameOver(true);
        setShowGameOverModal(true);
        setGameEndMessage("Time's up!");
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameTime, isGameActive]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      setOptions(questions[currentQuestionIndex].options);
      setIsAnswered(false);
    }
  }, [currentQuestionIndex, questions]);

  const handleRestart = () => {
    navigate("/temp3");
    setScore(0);
    setGameTime(60);
    setIsGameActive(true);
    setGameOver(false);
    setCurrentQuestionIndex(0);
    setGameEndMessage("");
    setBullets([]);
    setShipPosition(0);
    fetchQuestions();
    setShowGameOverModal(false);
    setShowCongratsModal(false);
  };

  const moveLeft = () => {
    setShipPosition((prev) => Math.max(prev - 10, 0));
  };

  const moveRight = () => {
    setShipPosition((prev) => Math.min(prev + 10, window.innerWidth - 100));
  };

  const handleShoot = () => {
    shoot();
  };

  const buttons = [
    {
      label: "Move Left",
      icon: <LeftOutlined />,
      action: moveLeft,
    },
    {
      label: "Shoot",
      icon: <AimOutlined />,
      action: handleShoot,
    },
    {
      label: "Move Right",
      icon: <RightOutlined />,
      action: moveRight,
    },
  ];

  const goToHomePage = () => {
    navigate("/teacher/home");
  };

  const shoot = () => {
    if (isAnswered) return;

    const shipWidth = 100;
    const bulletWidth = 5;

    const newBullet = {
      id: Date.now(),
      position: shipPosition + shipWidth / 2 - bulletWidth / 2,
      bottom: 200,
    };

    setBullets((prevBullets) => [...prevBullets, newBullet]);

    const moveBullet = setInterval(() => {
      setBullets((prevBullets) =>
        prevBullets
          .map((bullet) => {
            if (bullet.id === newBullet.id) {
              const newBottom = bullet.bottom + 5;
              if (checkCollision(newBottom, bullet.position)) {
                clearInterval(moveBullet);
                return null;
              }

              if (newBottom >= window.innerHeight) {
                clearInterval(moveBullet);
                return null;
              }

              return { ...bullet, bottom: newBottom };
            }
            return bullet;
          })
          .filter(Boolean)
      );
    }, 50);
  };

  const checkCollision = (bulletBottom, bulletPosition) => {
    const buttonHeight = 50;
    const buttonWidth = window.innerWidth / 4 - 20;

    for (let index = 0; index < options.length; index++) {
      const buttonX = (buttonWidth + 10) * index;
      if (
        bulletPosition >= buttonX &&
        bulletPosition <= buttonX + buttonWidth &&
        bulletBottom >= window.innerHeight - buttonHeight
      ) {
        handleAnswer(index);
        return true; // Collision detected
      }
    }
    return false; // No collision
  };

  const handleAnswer = (optionId) => {
    if (isAnswered || currentQuestionIndex >= questions.length) return;

    setIsAnswered(true);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.answer === options[optionId];

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setGameEndMessage("Correct answer!");

      setTimeout(() => {
        const newIndex = currentQuestionIndex + 1;
        if (newIndex >= questions.length) {
          setGameOver(true);
          setShowCongratsModal(true);
        } else {
          setCurrentQuestionIndex(newIndex);
        }
      }, 1000);
    } else {
      setGameEndMessage("Wrong answer, try again!");
    }

    setTimeout(() => {
      setIsAnswered(false);
      setGameEndMessage("");
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % buttons.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.button === 0) {
        buttons[highlightedIndex].action();
      }
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [highlightedIndex]);

  if (!questions || questions.length === 0) {
      return (
        <div className="fullscreen-loaders">
          <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
        </div>
      );
    }

  return (
    <div className="game-container">
      <div style={gameStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <Text
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "yellow",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <ClockCircleOutlined style={{ marginRight: "10px", color: "yellow" }} />
            {gameTime} s
          </Text>

          <Card
            style={{
              flex: "1 1 50%",
              maxWidth: "50%",
              height: "70px",
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "200px",
              boxSizing: "border-box",
              borderRadius: "50px",
            }}
          >
            <Title
              level={2}
              style={{
                margin: 0,
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: "bold",
                color: "purple",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                padding: "0 10px",
              }}
            >
              {questions[currentQuestionIndex]?.question || "Loading..."}
            </Title>
          </Card>

          <Text
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "yellow",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <TrophyOutlined style={{ marginRight: "8px", color: "gold" }} />
            Score: {score}
          </Text>
        </div>

        <div
          className="game-area"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {options.map((option, index) => (
            <Button
              key={index}
              type="primary"
              onClick={() => handleAnswer(index)}
              className="option"
              style={{
                width: "100%",
                fontSize: "30px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50px",
              }}
            >
              {option}
            </Button>
          ))}
        </div>

        {selectedShip && (
          <img
            src={`/images/${selectedShip}.png`}
            alt="Selected Ship"
            style={{
              position: "absolute",
              bottom: "50px",
              left: `${shipPosition}px`,
              width: "100px",
            }}
          />
        )}

        {bullets.map((bullet) => (
          <div
            key={bullet.id}
            className="bullet"
            style={{
              position: "absolute",
              left: `${bullet.position}px`,
              bottom: `${bullet.bottom}px`,
              width: "5px",
              height: "15px",
              backgroundColor: "red",
            }}
          />
        ))}

        <Modal
          title={
            <span className="modal-title">
              <TrophyOutlined style={{ marginRight: "8px", color: "gold" }} />
              Congratulations!
            </span>
          }
          open={showCongratsModal}
          onOk={goToHomePage}
          onCancel={goToHomePage}
          footer={[
            <Button key="home" type="primary" onClick={goToHomePage}>
              Home
            </Button>,
            <Button key="restart" type="default" onClick={handleRestart}>
              Restart
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

        <div className="button-container">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`button ${
                highlightedIndex === index ? "highlighted" : ""
              }`}
              onClick={() => {
                button.action();
                setHighlightedIndex(index);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {button.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
