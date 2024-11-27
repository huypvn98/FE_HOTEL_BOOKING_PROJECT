import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Image, Button, Form, Input, Upload, Select, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UploadOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { fetchEditUser } from "../../../redux/slices/userSlice";
import { updateUserInfo } from "../../../redux/slices/authSlice";

function UserProfile() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice?.user);
  const loading = useSelector((state) => state.userSlice.loading);

  const baseURL =
    "https://hotelbooking-a6b9ecdjbza2h5ft.canadacentral-01.azurewebsites.net";

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImage(null);
    setImageUrl("");
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("FirstName", values.FirstName);
    formData.append("LastName", values.LastName);
    formData.append("UserName", values.UserName || "");
    formData.append("Email", values.Email || "");
    formData.append("EmailType", values.EmailType);
    formData.append("Password", values.Password || "");

    if (image) {
      formData.append("Image", image);
    }

    try {
      const result = await dispatch(
        fetchEditUser({ id: id, formData })
      ).unwrap();
      console.log("Result from fetchEditUser:", result);
      // Update the local storage and Redux state with the new user data
      const updatedUserInfo = {
        ...user,
        firstName: values.FirstName,
        lastName: values.LastName,
        username: values.UserName,
        email: values.Email,
        urlImage: result.urlImage || user.urlImage, // Ensure urlImage is updated
      };
      
      console.log("Updated User Info:");
      console.log("First Name:", updatedUserInfo.firstName);
      console.log("Last Name:", updatedUserInfo.lastName);
      console.log("Username:", updatedUserInfo.username);
      console.log("Email:", updatedUserInfo.email);
      console.log("URL Image:", updatedUserInfo.urlImage);

      // Update the local storage and Redux state with the new user data
      dispatch(updateUserInfo(updatedUserInfo));
      // After successful update
      setIsEditing(false);
      setImage(null);
      setImageUrl("");
      form.resetFields(); // Reset form fields
      form.setFieldsValue(user); // Set back to current user values
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleImageChange = ({ file }) => {
    console.log("selected file", file);
    const selectedFile = file.originFileObj || file;
    if (selectedFile) {
      setImage(file);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
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
    <div className="mx-[400px] my-[150px] py-8">
      <div className="flex justify-center items-center ">
        <div className="bg-white rounded-xl shadow-lg w-[766px] p-8">
          <div className="flex flex-col items-center">
            <div
              style={{
                width: 128,
                height: 128,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Selected"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : user.urlImage ? (
                <Image
                  width={128}
                  height={128}
                  src={`${baseURL}${user.urlImage}`}
                />
              ) : (
                <Avatar
                  size={128}
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#f0f0f0", color: "#bfbfbf" }}
                />
              )}
            </div>
            {isEditing && (
              <Form.Item label="Upload Avatar" name="Image" className="mt-4">
                <Upload
                  name="avatar"
                  listType="picture"
                  showUploadList={false}
                  beforeUpload={() => false} // Prevent automatic upload
                  onChange={handleImageChange}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            )}
            <Form
              form={form}
              initialValues={{
                FirstName: user.firstName,
                LastName: user.lastName,
                UserName: user.username,
                Email: user.email,
              }}
              layout="vertical"
              className="w-full"
              onFinish={handleSubmit}
            >
              <Form.Item name="Image" hidden>
                <Input type="hidden" />
              </Form.Item>
              <Form.Item label="First Name" name="FirstName">
                <Input readOnly={!isEditing} />
              </Form.Item>
              <Form.Item label="Last Name" name="LastName">
                <Input readOnly={!isEditing} />
              </Form.Item>
              <Form.Item label="User Name" name="UserName">
                <Input readOnly={!isEditing} />
              </Form.Item>
              <Form.Item label="Email" name="Email">
                <Input readOnly={!isEditing} />
              </Form.Item>
              <Form.Item label="Email Type" name="EmailType">
                <Select
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="Select your email type"
                  className="border-[1.5px] rounded-md"
                  options={options}
                  disabled={!isEditing}
                />
              </Form.Item>
              <Form.Item label="Password" name="Password">
                <Input readOnly={!isEditing} />
              </Form.Item>
              <Form.Item>
                {isEditing ? (
                  <div className="flex flex-row justify-between space-x-6">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="w-[350px]"
                    >
                      Save
                    </Button>
                    <Button onClick={handleCancel} className="w-[350px]">
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="primary"
                    onClick={handleEdit}
                    className="w-full"
                  >
                    Edit
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
