import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loading = useSelector((state) => state.authSlice?.loading);
  const location = useLocation();
  const cart = JSON.parse(localStorage.getItem("cart"))


  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogin = () => {

    dispatch(login({ username, password }))
      .then((res) => {
        console.log(res);
        if (res.payload.status === 200) {
          message.success("Login successful!");
          if (res.payload?.data?.userInfo.roles === "Admin") {
            navigate("admin");
          } else if (res.payload?.data?.userInfo.roles === "Customer") {
            if(cart === undefined || cart === null || cart === "" ){
            console.log("logged")  
            console.log(cart)
            // navigate("/");
            
            }else{
              navigate(`/bookingcart/${cart?.id}`)
            }
            
          } else {
            message.error("Wrong username or password");
          }
        } else {
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        message.error("Login failed. Please try again.");
      });
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
              loading={loading}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Form.Item>

          {/* <div style={{ textAlign: "center", marginBottom: "10px" }}>or</div> */}

          {/* Google Sign Up Button */}
          {/* <Form.Item>
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
          </Form.Item> */}

          {/* Log In Link */}
          <div className="flex flex-row space-x-2 items-center justify-center">
            <p> Don't have an account?</p>
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
