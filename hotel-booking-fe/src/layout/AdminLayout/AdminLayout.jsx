import React, { useState } from "react";
import {
  FacebookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
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
        color="light"
        style={{ backgroundColor: "#212631" }}
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
          <p style={{ color: "white", fontSize: "40px" }}>EASY STAY</p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ backgroundColor: "#212631" }}
          onClick={handleMenuClick}
          items={[
            {
              key: "admin/dashboard",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "admin/nav2",
              icon: <VideoCameraOutlined />,
              label: "Nav 2",
            },
            {
              key: "admin/nav3",
              icon: <UploadOutlined />,
              label: "Nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: "#212631",
            color: "#FFFFFFA6",
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
              color: "#FFFFFFA6",
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
            background: "#1D222B",
          }}
        >
          <div style={{ width: "1270px" }}>{children && children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
