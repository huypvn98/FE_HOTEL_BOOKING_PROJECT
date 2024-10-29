import { Button, Layout, Menu, Select } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import "./DefaultLayout.css";
import { logout } from "../../redux/slices/authSlice";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Content } = Layout;
const { Item } = Menu;

const DefaultLayout = ({ children , isHomePage }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authSlice.isAuthenticated
  );
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  console.log("check isAuthenticated header", isAuthenticated);
  return (
    <Layout className="layout">
      <header className={`header ${isHomePage ? 'home-header' : ''}`} >
        <div className="flex w-[400px]">
          <Menu className="header-menu w-[518px], h-[47px]" mode="horizontal">
            <Item key="home">
              <Link to="/">Home</Link>
            </Item>
            <Item key="about">About Us</Item>
            <Item key="tour">Tour Package</Item>
            <Item key="contact">Contact Us</Item>
          </Menu>
          <div className="header-function ml-[167px] flex">
            <Select className="w-[80px] h-[47px]" placeholder="Eng"></Select>
            {isAuthenticated ? (
              <Button
                className="logout-button w-[77px] h-[47px]"
                style={{
                  backgroundColor: "transparent",
                  border: "0px",
                  boxShadow: "none",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  className={`login-button w-[77px] h-[47px] ${isHomePage ? 'home-login-button' : ''}`} 
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
              Services
            </p>
            <p className="text-white font-semibold text-[18px]">
              Bike and Rickshaw rental
            </p>
            <p className="text-white font-semibold text-[18px]">
              Guided Tours of Lucca
            </p>
            <p className="text-white font-semibold text-[18px]">
              Guided Bike Tour of Lucca
            </p>
            <p className="text-white font-semibold text-[18px]">
              Trip In The Tuscan Hills
            </p>
            <p className="text-white font-semibold text-[18px]">
              Transportation With Luxury Cars
            </p>
            <p className="text-white font-semibold text-[18px]">
              Wine Tours By Bus With Guide
            </p>
          </div>
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">
              Home
            </p>
            <p className="text-white font-semibold text-[18px]"> Home</p>
            <p className="text-white font-semibold text-[18px]">About Us</p>
            <p className="text-white font-semibold text-[18px]">
              Tour Packages
            </p>
          </div>
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">
              Help
            </p>
            <p className="text-white font-semibold text-[18px]">Terms of Use</p>
            <p className="text-white font-semibold text-[18px]">
              Provicy Policy
            </p>
          </div>
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">
              Contacts
            </p>
            <p className="text-white font-semibold text-[18px]">
              Piazza Napoleone, Lucca, Tuscany
            </p>
            <p className="text-white font-semibold text-[18px]">
              {" "}
              <PhoneOutlined className="text-[#A9B489]" /> +39 346 368 5708
            </p>
            <p className="text-white font-semibold text-[18px]">
              <MailOutlined className="text-[#A9B489]" /> italiainlimo@gmail.com
            </p>
          </div>
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">
              Social Media
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default DefaultLayout;