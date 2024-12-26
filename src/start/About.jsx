import React from "react";
import { Row, Col, Card, Button, Typography, Divider } from "antd";
import { LaptopOutlined, TeamOutlined, CodeOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
import "./About.css";

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <Navbar />
      <section className="about-us-introduction">
        <Row justify="center">
          <Col span={18}>
            <Title level={1} className="about-us-title">
              About Our Project
            </Title>
            <Paragraph className="about-us-text">
              Our project is designed to revolutionize the way users interact
              with software. The goal is to provide an intuitive platform that
              simplifies tasks, improves productivity, and enhances
              accessibility. With cutting-edge technologies and a user-centered
              approach, we aim to create a tool that fits seamlessly into daily
              workflows.
            </Paragraph>
          </Col>
        </Row>
      </section>

      <Divider />

      {/* Project Goals Section */}
      <section className="project-goals">
        <Row justify="center">
          <Col span={18}>
            <Title level={2} className="title-color">
              Our Goals
            </Title>
            <ul className="goals-list">
              <li>
                <strong>Accessibility:</strong> Ensuring our platform is usable
                by people with various disabilities.
              </li>
              <li>
                <strong>Efficiency:</strong> Streamlining tasks to improve user
                productivity and reduce the time spent on repetitive actions.
              </li>
              <li>
                <strong>User-Centered Design:</strong> Focusing on the needs of
                the users to create a seamless and intuitive experience.
              </li>
              <li>
                <strong>Innovation:</strong> Leveraging the latest technologies
                to solve real-world problems in an innovative way.
              </li>
            </ul>
          </Col>
        </Row>
      </section>

      <Divider />

      {/* Call to Action Section */}
      <section className="call-to-action">
        <Row justify="center">
          <Col span={18}>
            <Title level={2} className="title-color">
              Get Involved
            </Title>
            <Paragraph className="title-color">
              Want to be part of this amazing project? We're always looking for
              new collaborators and ideas! Reach out to us to learn more about
              how you can contribute.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              href="mailto:contact@ourproject.com"
            >
              Contact Us
            </Button>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default AboutUs;
