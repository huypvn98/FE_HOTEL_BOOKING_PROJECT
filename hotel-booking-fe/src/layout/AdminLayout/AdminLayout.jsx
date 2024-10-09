import React, { useState } from "react";
import {
  BookOutlined,
  DashboardOutlined,
  FacebookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageTwoTone,
  MoneyCollectOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import "./AdminLayout.css";
import { useNavigate } from "react-router";
const { Header, Sider, Content } = Layout;
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        style={{ backgroundColor: "white" }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
          }}
        >
          <p style={{  fontSize: "40px" }}>EASY STAY</p>
        </div>
        <Menu
          // theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ backgroundColor: "white" }}
          onClick={handleMenuClick}
          items={[
            {
              key: "admin/dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "admin/owner-management",
              icon: <UserOutlined />,
              label: "Hotel Owners",
            },
            {
              key: "admin/booking-detail",
              icon: <BookOutlined />,
              label: "Booking Details",
            },
            {
              key: "admin/user-management",
              icon: <UserOutlined />,
              label: "User",
            },
            {
              key: "admin/refund-management",
              icon: <MoneyCollectOutlined />,
              label: "Refund",
            },
            {
              label: "",
            },
            {
              key: "admin/message",
              icon: <MessageTwoTone />,
              label: "Message",
            },
            {
              key: "admin/help",
              icon: <BookOutlined />,
              label: "Help",
            },
            {
              key: "admin/setting",
              icon: <SettingOutlined />,
              label: "Setting",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#F5F5F5",  
            color: "gray",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "gray",
            }}
          />
          <a
            href="https://www.facebook.com/profile.php?id=61565933532280"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookOutlined style={{ fontSize: "32px" }} />
          </a>
        </Header>
        <Content
          style={{
            // margin: '24px 16px',
            // padding: 24,
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            padding: "0px 24px",
            background: "#F5F5F5",  
          }}
        >
          <div style={{ width: "1270px" }}>{children && children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
