import {
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import googleIcon from "../../../image/googleIcon.png";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bgImage">
      <div className="overlay"></div>
      <div className="login_form">
        <h2
          style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}
        >
          Log In
        </h2>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* Email Field */}
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="Enter your email address"
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          {/* Terms Checkbox */}
          <Form.Item>
            <a style={{ display: "flex", justifyContent: "right" }} href="">
              Forgot your password?
            </a>
          </Form.Item>

          {/* Sign Up Button */}
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: "#A9B489",
                borderColor: "#A9B489",
                borderRadius: "20px",
              }}
            >
              Log In
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginBottom: "10px" }}>or</div>

          {/* Google Sign Up Button */}
          <Form.Item>
            <Button
              size="large"
              block
              icon={<img src={googleIcon} style={{ width: "20px" }} />}
              style={{
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "20px",
              }}
            >
              Log In with Google
            </Button>
          </Form.Item>

          {/* Log In Link */}
          <div style={{ textAlign: "center" }}>
            Don't have an account?
            <Link to="/signup" style={{ color: "#A9B489" }}>
              Sign Up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
