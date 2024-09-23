import { Button, Layout, Menu, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import "./DefaultLayout.css"
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { Item } = Menu;

const DefaultLayout = ({ children }) => {
  return (
    <Layout>
      <header className="header">
      <Menu className="header-menu w-[1010px], h-[47px]" mode="horizontal">
      <Item key="home">
        Home
      </Item>
      <Item key="about">
        About Us
      </Item>
      <Item key="tour">
        Tour Package
      </Item>
      <Item key="contact">
        Contact Us
      </Item>
    </Menu>
    <div className="header-function ml-[167px] flex">
        <Select className="w-[80px] h-[47px]" placeholder="Eng"></Select>
        <Button className="login-button w-[77px] h-[47px]" style={{backgroundColor:"rgba(255, 255, 255, 0.2)", border:"0px", boxShadow:"none", }}>Login</Button>
        <Button className="signup-button w-[168px] h-[47px]" style={{backgroundColor:"#A9B489",borderRadius:"50px", boxShadow:"none", color:"white", }}>Sign Up</Button>
    </div>
      </header>
      <Content
        style={{
          background: "white",
        }}
      >
        {children && children}
      </Content>
      <footer className="footer">
        <div className="footer-content">
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">Services</p>
            <p className="text-white font-semibold text-[18px]">Bike and Rickshaw rental</p>
            <p className="text-white font-semibold text-[18px]">Guided Tours of Lucca</p>
            <p className="text-white font-semibold text-[18px]">Guided Bike Tour of Lucca</p>
            <p className="text-white font-semibold text-[18px]">Trip In The Tuscan Hills</p>
            <p className="text-white font-semibold text-[18px]">Transportation With Luxury Cars</p>
            <p className="text-white font-semibold text-[18px]">Wine Tours By Bus With Guide</p>
          </div>
          <div className="vertical">
          <p className="text-white font-extrabold mb-[10px] text-[20px]">Home</p>
          <p className="text-white font-semibold text-[18px]"> Home</p>
          <p className="text-white font-semibold text-[18px]">About Us</p>
          <p className="text-white font-semibold text-[18px]">Tour Packages</p>

          </div>
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">Help</p>
            <p className="text-white font-semibold text-[18px]">Terms of Use</p>
            <p className="text-white font-semibold text-[18px]">Provicy Policy</p>
          </div>
          <div className="vertical">
            <p className="text-white font-extrabold mb-[10px] text-[20px]">Contacts</p>
            <p className="text-white font-semibold text-[18px]">Piazza Napoleone, Lucca, Tuscany</p>
            <p className="text-white font-semibold text-[18px]"> <PhoneOutlined className="text-[#A9B489]"/> +39 346 368 5708</p>
            <p className="text-white font-semibold text-[18px]"><MailOutlined className="text-[#A9B489]"/> italiainlimo@gmail.com</p>
          </div>
          <div className="vertical">
          <p className="text-white font-extrabold mb-[10px] text-[20px]">Social Media</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default DefaultLayout;
