import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateContact } from "../../../redux/slices/contactSlice.js"; 

function ContactForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.contactSlice);

  const onFinish = (values) => {
    console.log("Form Values:", values);
    dispatch(fetchCreateContact(values)).then((action) => {
      if (fetchCreateContact.fulfilled.match(action)) {
        form.resetFields();
      }
    });
  }

  return (
    <div className="w-[500px]">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="font-semibold text-black text-2xl font-mono">
            Contact Us
          </h1>
          <h2 className="text-[#777777] text-lg font-mono font-medium">
            We'll soon try to contact you.
          </h2>
        </div>
        <div>
          <div className=" rounded-lg ">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Full Name"
                name="FullName"
                rules={[{ required: true, message: "Please enter your full name" }]}
              >
                <Input placeholder="Full name" className="rounded-md h-[48px]" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="PhoneNumber"
                rules={[{ required: true, message: "Please enter your phone number" }]}
              >
                <Input placeholder="Phone number" className="rounded-md h-[48px]" />
              </Form.Item>
              <Form.Item
                label="Email Address"
                name="EmailAddress"
                rules={[
                  { required: true, message: "Please enter your email" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  placeholder="e.g., example@gmail.com"
                  className="rounded-md h-[48px]"
                />
              </Form.Item>
              <Form.Item>
                <button
                  htmlType="submit"
                  className="w-full bg-[#A9B489] hover:bg-[#A9B489] text-white rounded-md h-[48px]"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </Form.Item>
              {error && <p className="text-red-500">{error}</p>}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;