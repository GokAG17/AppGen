import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import { Button, Tooltip } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ScatterBoxLoader } from "react-awesome-loaders";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const handleDoubleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSliding(true);
      setTimeout(() => {
        navigate("/student/temp");
      }, 1000); 
    }, 4000); 
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <ScatterBoxLoader
          primaryColor={"#6366F1"}
          background={"#000000"}
        />
      </div>
    );
  }

  return (
    <div className={`homeg-container ${isSliding ? "slide-down" : ""}`}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="left-section">
          <h2 className="page-heading">Learning</h2>
        </div>
        <div className="right-section">
          <Tooltip title="Profile">
            <Button
              className="profile-button"
              icon={<UserOutlined />}
              size="large"
              type="primary"
            />
          </Tooltip>
          <Tooltip title="Logout">
            <Button
              className="logout-button"
              icon={<LogoutOutlined />}
              size="large"
              type="primary"
              onClick={handleLogout}
            />
          </Tooltip>
        </div>
      </div>

      {/* Main Section */}
      <div
        className="main-section"
        onClick={handleDoubleClick}
        style={{ cursor: "pointer" }}
      >
        {/* Quote Section */}
        <div className="quote-section">
          <p className="quote">
            "Learning is a treasure that will follow its owner everywhere."
          </p>
        </div>

        {/* Gaming Animation Section */}
        <div className="gaming-animation">
          <div className="game-console"></div>
          <div className="animated-character"></div>
        </div>

        {/* Main Content Section with Typing Animation */}
        <div className="main-content">
          <Typewriter
            onInit={(writer) => {
              writer
                .typeString("Hello Students! Welcome to Learning")
                .pauseFor(1000)
                .typeString("<br />Double click to start ")
                .start();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
