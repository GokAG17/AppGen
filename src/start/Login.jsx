import React from "react";
import { Form, Input, Button, Row, Col, Typography, Divider } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Login.css";

const { Title } = Typography;

const usersData = [
  { username: "user1", password: "teacher", role: "teacher" },
  { username: "user2", password: "student", role: "student" },
];

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password } = values;

    const user = usersData.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      if (user.role === "teacher") {
        navigate("/teacher/home");
      } else if (user.role === "student") {
        navigate("/student/home");
      }
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <Navbar /> 
      <Row justify="center" align="middle" className="form-row">
        <Col xs={24} sm={18} md={12} lg={8}>
          <div className="form-box">
            <Title level={2} className="form-title">
              Login
            </Title>
            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              className="login-form"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your username"
                  className="input-field"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  className="input-field"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="login-btn"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <Divider className="divider">OR</Divider>

            {/* Google Login Option */}
            {/* <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className="google-btn"
            /> */}

            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            <div className="create-account-link">
              <p>
                Don't have an account?{" "}
                <a href="/create-account">Create one here</a>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
