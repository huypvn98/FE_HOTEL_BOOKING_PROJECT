import { Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router";

const { Content } = Layout;
const DefaultLayout = ({ children }) => {
  return (
    <Layout>
      <header className="h-[100px]"></header>
      <Content
        style={{
          background: "white",
        }}
      >
        {children && children}
      </Content>
      <footer className="h-[100px]"></footer>
    </Layout>
  );
};

export default DefaultLayout;
