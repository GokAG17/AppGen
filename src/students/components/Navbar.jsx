import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./Navbar.css";

const { Sider, Content } = Layout;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/student/home">Home</Link>,
    },
    {
      key: "2",
      icon: <LogoutOutlined />,
      label: <a href="/">Logout</a>,
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
