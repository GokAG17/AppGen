import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import {
  QuestionCircleOutlined,
  AppstoreAddOutlined,
  PlayCircleOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ScatterBoxLoader } from "react-awesome-loaders";
import Typewriter from "typewriter-effect";
import "./Template.css";

const Template = () => {
  const [animate, setAnimate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isTraversalStarted, setTraversalStarted] = useState(false); // New state
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Quiz",
      content: "Test your knowledge with exciting quizzes.",
      icon: <QuestionCircleOutlined />,
      path: "/student/temp1",
    },
    {
      title: "Fillups",
      content: "Complete sentences by filling in the blanks.",
      icon: <AppstoreAddOutlined />,
      path: "/student/temp2",
    },
    {
      title: "Game",
      content: "Play fun and interactive games.",
      icon: <PlayCircleOutlined />,
      path: "/student/temp3",
    },
    {
      title: "FlashCards",
      content: "Study using interactive flashcards.",
      icon: <FileSearchOutlined />,
      path: "/student/temp4",
    },
  ];

  useEffect(() => {
    let autoTraversal;
    if (isTraversalStarted) {
      autoTraversal = setInterval(() => {
        setActiveCardIndex((prevIndex) => (prevIndex + 1) % cardData.length);
      }, 5000);
    }

    const handlePageDoubleClick = () => {
      if (!isTraversalStarted) {
        setTraversalStarted(true);
      } else if (isTraversalStarted) {
        navigateToActiveCard();
      }
    };

    document.addEventListener("dblclick", handlePageDoubleClick);

    return () => {
      clearInterval(autoTraversal);
      document.removeEventListener("dblclick", handlePageDoubleClick);
    };
  }, [isTraversalStarted, activeCardIndex, navigate]);

  const navigateToActiveCard = () => {
    if (!isTraversalStarted) return; // Ensure the function only works when traversal has started
    const activeCard = cardData[activeCardIndex];
    setLoading(true);

    setTimeout(() => {
      navigate(activeCard.path);
      setLoading(false);
    }, 5000);
  };

  const handleCardClick = (path) => {
    setLoading(true);

    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 5000);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <ScatterBoxLoader primaryColor={"#6366F1"} background={"#000000"} />
      </div>
    );
  }

  return (
    <div className={`template-container ${animate ? "animate" : ""}`}>
      <div className="typewriter2-container">
        <Typewriter
          onInit={(writer) => {
            writer
              .typeString("To Access and Select !")
              .pauseFor(1000)
              .typeString("<br />Double click to start ")
              .start();
          }}
        />
      </div>

      <div className="cards-container">
        <Row gutter={[16, 16]} justify="center">
          {cardData.map((card, index) => (
            <Col span={8} key={index}>
              <Card
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginRight: "10px" }}>{card.icon}</div>
                    {card.title}
                  </div>
                }
                bordered={false}
                className={`custom-card ${
                  activeCardIndex === index ? "active" : ""
                }`}
                style={{
                  backgroundImage: card.backgroundImage,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => handleCardClick(card.path)}
              >
                <p>{card.content}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Template;
