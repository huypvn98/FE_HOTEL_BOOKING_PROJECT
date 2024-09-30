import React from "react";
import "./SignUp.css";
import { Button, Checkbox, Form, Input } from "antd";
import {
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import googleIcon from "../../image/googleIcon.png";

const SignUp = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="bgImage">
      <div className="overlay"></div>
      <div className="signup_form">
        <h2
          style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}
        >
          Create Account
        </h2>
        <Form
          name="signup_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {/* Name Field */}
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter your name!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter your name"
            />
          </Form.Item>

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
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("You need to agree with terms"),
              },
            ]}
          >
            <Checkbox>I agree with Terms and Privacy</Checkbox>
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
              Sign Up
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
              Sign Up with Google
            </Button>
          </Form.Item>

          {/* Log In Link */}
          <div style={{ textAlign: "center" }}>
            Already have an account?
            <Link to="/login" style={{ color: "#A9B489" }}>
              Log In
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
