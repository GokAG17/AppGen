import React from "react";
import { Menu } from "antd";
// import {
//   HomeOutlined,
//   InfoCircleOutlined,
//   LoginOutlined,
//   UserAddOutlined,
// } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "home":
        navigate("/");
        break;
      case "about":
        navigate("/about-us");
        break;
      case "login":
        navigate("/login");
        break;
      case "create-account":
        navigate("/create-account");
        break;
      default:
        break;
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <span className="logo-text">App Gen</span>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={handleMenuClick}
        className="menu-bar"
      >
        <Menu.Item key="home" className="menu-item">
          Home
        </Menu.Item>
        <Menu.Item key="about" className="menu-item">
          About
        </Menu.Item>
        <Menu.Item key="login" className="menu-item">
          Login
        </Menu.Item>
        <Menu.Item key="create-account" className="menu-item">
          Create Account
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
