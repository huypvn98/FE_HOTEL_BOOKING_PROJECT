import { Layout, Menu, Select, Button, Dropdown, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import "./DefaultLayout.css";
import { logout } from "../../redux/slices/authSlice";
import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Content } = Layout;
const { Item } = Menu;

const DefaultLayout = ({ children, isHomePage }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authSlice?.isAuthenticated
  );
  const user = useSelector((state) => state.authSlice?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const baseURL =
    "https://hotelbooking-a6b9ecdjbza2h5ft.canadacentral-01.azurewebsites.net";
  const menu = (
    <Menu>
      <Item key="profile">
        <Link to={`/profile/${user?.userID}`}>Profile</Link>
      </Item>
      <Item key="logout" onClick={handleLogout}>
        Logout
      </Item>
    </Menu>
  );

  return (
    <Layout className="layout">
      <header className={`header ${isHomePage ? "home-header" : ""}`}>
        <Menu
          className="header-menu"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={(e) => setCurrent(e.key)}
        >
          <Item key="/">
            <Link to="/">Home</Link>
          </Item>
          <Item key="/about">
            <Link to="/about">About Us</Link>
          </Item>
          <Item key="/contact">
            <Link to="/contact">Contact Us</Link>
          </Item>
        </Menu>
        <div className="header-function flex flex-row space-x-2">
          <Select className="w-[80px] h-[47px]" placeholder="Eng"></Select>
          {isAuthenticated ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="flex items-center cursor-pointer">
                <Avatar
                  src={
                    user && user.urlImage ? `${baseURL}${user.urlImage}` : null
                  }
                  alt={user ? user.username : "User"}
                  icon={!user || !user.urlImage ? <UserOutlined /> : null}
                />
                <span
                  className={`ml-2 font-semibold text-lg ${
                    isHomePage ? "ml-2 text-white font-semibold text-lg" : ""
                  }`}
                >
                  {user?.username}
                </span>
              </div>
            </Dropdown>
          ) : (
            <>
              <Button
                className={`login-button w-[77px] h-[47px] ${
                  isHomePage ? "home-login-button" : ""
                }`}
                style={{
                  backgroundColor: "transparent",
                  border: "0px",
                  boxShadow: "none",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                className="signup-button w-[168px] h-[47px]"
                style={{
                  backgroundColor: "#A9B489",
                  borderRadius: "50px",
                  boxShadow: "none",
                  color: "white",
                }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </header>
      <Content
        className="content"
        style={{
          background: "white",
        }}
      >
        {children && children}
      </Content>
      <footer className="footer">
        <div className="footer-content">
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">
              About Us
            </p>
            <p className="text-white font-semibold text-[16px]">
              This is a startup project for the Exe201 subject of the EasyStay
              group.
            </p>
          </div>
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">
              Services
            </p>
            <p className="text-white font-semibold text-[16px]">
              Hotel Booking
            </p>
            <p className="text-white font-semibold text-[16px]">Tour Booking</p>
          </div>
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">
              Home
            </p>
            <p className="text-white font-semibold text-[16px]">
              <Link to="/">Home</Link>
            </p>
            <p className="text-white font-semibold text-[16px]">
              <Link to="/about">About Us</Link>
            </p>
          </div>
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">
              Help
            </p>
            <p className="text-white font-semibold text-[16px]">
              <Link to="/termOfUse">Terms of Use</Link>
            </p>
            <p className="text-white font-semibold text-[16px]">
             <Link to="/privacy">Privacy Policy</Link>
            </p>
          </div>
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">
              Contacts
            </p>
            <p className="text-white font-semibold text-[16px]">
              Thanh Blue, Nhat Anh, Thanh Binh
            </p>
            <p className="text-white font-semibold text-[16px] space-x-2 flex flex-row">
              {" "}
              <PhoneOutlined className="text-[#A9B489]" /> <p>0942557312</p>
            </p>
            <p className="text-white font-semibold text-[18px] space-x-2 flex flex-row">
              <MailOutlined className="text-[#A9B489]" />{" "}
              <p>bintri92@gmail.com</p>
            </p>
          </div>
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">
              Social Media
            </p>
            <p className="text-white font-semibold text-[16px] space-x-2 flex flex-row">
              <FacebookOutlined className="text-[#A9B489]" />
              <Link
                to="https://www.facebook.com/profile.php?id=61565933532280"
                target="_blank"
                rel="noopener noreferrer"
              >
                FaceBook
              </Link>
            </p>
            <p className="text-white font-semibold text-[16px] space-x-2 flex flex-row">
              <InstagramOutlined className="text-[#A9B489]" />
              <Link to="https://www.instagram.com/easy_stay24/" target="_blank">
                <p>Instagram</p>
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default DefaultLayout;
