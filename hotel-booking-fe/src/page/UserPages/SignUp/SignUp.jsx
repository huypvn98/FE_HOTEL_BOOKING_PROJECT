import React from "react";
import "./SignUp.css";
import { Button, Checkbox, Form, Input, Select } from "antd";
import {
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import googleIcon from "../../../image/googleIcon.png";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/slices/testSlice";

const SignUp = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(registerUser(values));
  };

  const options = [
    {
      value: "thuong",
      label: "Email thường",
    },
    {
      value: "email co quan",
      label: "Email cơ quan ",
    },
    {
      value: "email giao duc",
      label: "Email giáo dục",
      
    },
  ];

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
          {/* First Name Field */}
          <Form.Item
            name="FirstName"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please enter your first name!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter your first name"
            />
          </Form.Item>

          {/* Last Name Field */}
          <Form.Item
            name="LastName"
            label="Last name"
            rules={[
              {
                required: true,
                message: "Please enter your last name!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter your last name"
            />
          </Form.Item>

          {/* User Name Field */}
          <Form.Item
            name="UserName"
            label="User name"
            rules={[
              {
                required: true,
                message: "Please enter your user name!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter your user name"
            />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            name="Email"
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

          <Form.Item
            name="EmailType"
            label="Email Type"
            rules={[
              {
                required: true,
                message: "Please select an email type!",
              },
            ]}
            initialValue="thuong"
            className="custom-form-item"
          >
            <Select
              size="large"
              prefix={<MailOutlined />}
              placeholder="Select your email type"
              className="border-[1.5px] rounded-md"
              options={options}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            name="Password"
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
