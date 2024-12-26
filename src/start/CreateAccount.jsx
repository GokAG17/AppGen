import React from "react";
import { Form, Input, Button, Row, Col, Typography, Select, Divider, Space } from "antd";
import { UserAddOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./CreateAccount.css"; 

const { Title } = Typography;
const { Option } = Select;

const CreateAccount = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Account Created: ", values);
    navigate("/login"); 
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google Login Response: ", response);
    navigate("/home"); 
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Google Login Error: ", error);
  };

  return (
    <div className="create-account-container">
      <Navbar />
      <Row justify="center" align="middle" className="form-row">
        <Col xs={24} sm={18} md={12} lg={8}>
          <div className="form-box">
            <Title level={4} className="form-title">
              Create Account
            </Title>
            <Form
              name="create_account"
              onFinish={onFinish}
              layout="vertical"
              requiredMark="optional"
              className="create-account-form"
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter your full name!" },
                ]}
              >
                <Input
                  prefix={<UserAddOutlined />}
                  placeholder="Enter your full name"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter your email"
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
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm your password"
                />
              </Form.Item>

              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select your role!" }]}
              >
                <Select placeholder="Select your role" allowClear>
                  <Option value="teacher">Teacher</Option>
                  <Option value="student">Student</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Create Account
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            {/* Google Login Button */}
            <Space direction="vertical" style={{ width: "100%" }}>
              
            </Space>

            <Divider />

            {/* Already Have an Account Link */}
            <div className="already-account">
              <Button type="link" onClick={() => navigate("/login")}>
                Already have an account? Login here
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAccount;
