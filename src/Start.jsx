import React from "react";
import { Button, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "./start/Navbar"; // Import the Navbar component
import "./Start.css"; // Include the updated CSS

const { Header, Content } = Layout;
const { Title } = Typography;

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <Layout className="start-layout">
      {/* Use the Navbar component */}
      <Navbar />

      {/* Main Content */}
      <Content className="start-content">
        <div className="start-background">
          <div className="text-section">
            <Title level={1} className="start-title">
              Welcome to AI Hub
            </Title>
            <p className="start-description">
              Your gateway to advanced AI solutions, crafted for simplicity and
              efficiency.
            </p>
          </div>
          <div className="action-section">
            <Button
              type="primary"
              size="large"
              shape="round"
              className="start-button"
              onClick={handleStart}
            >
              Get Started
            </Button>
          </div>
          <div className="features-section">
            <div className="features-row">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <div className="feature-title">Fast Performance</div>
                <div className="feature-description">
                  Experience lightning-fast processing and results.
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <div className="feature-title">Secure</div>
                <div className="feature-description">
                  Your data is safe with top-notch security measures.
                </div>
              </div>
            </div>
            <div className="features-row">
              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <div className="feature-title">AI-Powered</div>
                <div className="feature-description">
                  Leverage the power of cutting-edge AI technology.
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌐</div>
                <div className="feature-title">Global Access</div>
                <div className="feature-description">
                  Connect from anywhere, anytime, effortlessly.
                </div>
              </div>
            </div>
          </div>
          {/* About Us Section */}
          <div className="about-us-section">
            <Title level={2} className="about-us-title">
              About Us
            </Title>
            <p className="about-us-description">
              AI Hub is dedicated to delivering the best AI-powered solutions to
              businesses and individuals alike. Our platform is built with
              cutting-edge technology to ensure top-tier performance, security,
              and scalability.
            </p>
            <p className="about-us-description">
              For more details, please visit our{" "}
              <a href="/about-us">About Us</a> page.
            </p>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default StartPage;
