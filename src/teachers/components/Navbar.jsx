import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  HomeOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  LogoutOutlined, // Import Logout icon
} from "@ant-design/icons";
import "./Navbar.css";

const { Sider, Content } = Layout;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // Add any logout logic here, like clearing user session, etc.
    // Navigate to the root path ("/")
    navigate("/");
  };

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/teacher/home">Home</Link>,
    },
    // {
    //   key: "2",
    //   icon: <TeamOutlined />,
    //   label: <Link to="/teacher/students">Students</Link>,
    // },
    // {
    //   key: "3",
    //   icon: <AppstoreAddOutlined />,
    //   label: <Link to="/teacher/templates">Templates</Link>,
    // },
    // {
    //   key: "4",
    //   icon: <QuestionCircleOutlined />,
    //   label: <Link to="/teacher/questions">Questions</Link>,
    // },
    // {
    //   key: "5",
    //   icon: <UserOutlined />,
    //   label: <Link to="/teacher/profile">Profile</Link>,
    // },
    // {
    //   key: "6",
    //   icon: <SettingOutlined />,
    //   label: <Link to="/teacher/settings">Settings</Link>,
    // },
    {
      key: "7",
      icon: <LogoutOutlined />,
      label: <a onClick={handleLogout}>Logout</a>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="custom-sider"
      >
        <div className="toggle-button">
          <Button
            type="text"
            onClick={toggleCollapse}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            className="toggle-button"
            style={{ fontSize: "18px", marginLeft: 16 }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          className="custom-menu"
        />
        {/* <div className="logout-container">
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </Button>
        </div> */}
      </Sider>
      <Layout>
        <Content>
          <div className="page-content">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Navbar;
