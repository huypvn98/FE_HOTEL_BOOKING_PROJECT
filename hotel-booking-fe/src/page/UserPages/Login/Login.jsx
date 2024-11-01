import {
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import googleIcon from "../../../image/googleIcon.png";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const loading = useSelector((state) => state.auth.loading);
  //const error = useSelector((state) => state.auth.error);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogin = () => {
    dispatch(login({ username, password }));
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
          {/* Username Field */}
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please enter your username!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="Enter your email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              //disabled={loading}
              onClick={handleLogin}
            >
              Login
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
