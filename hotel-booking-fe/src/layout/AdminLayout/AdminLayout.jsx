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
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Avatar } from "antd";
import "./AdminLayout.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice"; // Import the logout action

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice?.user); // Get user from the Redux store
  const baseURL =
  "https://hotelbooking-a6b9ecdjbza2h5ft.canadacentral-01.azurewebsites.net";
  
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
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
          <p style={{ fontSize: "40px" }}>EASY STAY</p>
        </div>
        <div className="flex flex-col">
          <Menu
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
                key: "admin/room-management",
                icon: <HomeOutlined />,
                label: "Room",
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
          <div className="p-4 border-t-2 border-gray-200 text-center flex flex-row justify-end">
            <Avatar size={64}  src={
                      user && user.urlImage
                        ? `${baseURL}${user.urlImage}`
                        : null
                    } />
            <div>
              <p style={{ margin: "8px 0", fontWeight: "bold" }}>
                {user?.username}
              </p>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{
                  fontSize: "16px",
                  color: "red",
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#F5F5F5",
            color: "gray",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <a
              href="https://www.facebook.com/profile.php?id=61565933532280"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: "16px" }}
            >
              <FacebookOutlined style={{ fontSize: "32px" }} />
            </a>
          </div>
        </Header>
        <Content
          style={{
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
