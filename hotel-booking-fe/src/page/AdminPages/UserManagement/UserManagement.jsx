import { Button, Col, Row, Select, Space, Table, Tag, Input, Avatar, Modal, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, fetchCreateUser } from '../../../redux/slices/userSlice';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

const baseURL = "https://hotelbooking-a6b9ecdjbza2h5ft.canadacentral-01.azurewebsites.net"; // Replace with your actual base URL

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userSlice?.users);
  const loading = useSelector((state) => state.userSlice?.loading);
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const handleAddUser = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreateUser = async (values) => {
    try {
      await dispatch(fetchCreateUser(values)).unwrap();
      setIsModalVisible(false);
      form.resetFields();
      dispatch(fetchAllUsers()); // Refetch the table data
    } catch (error) {
      console.error("Create user failed:", error);
    }
  };

  const filteredUsers = users
    ?.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.roleName.localeCompare(b.roleName);
      } else if (sortOrder === 'desc') {
        return b.roleName.localeCompare(a.roleName);
      }
      return 0;
    });

  const userManagementColumns = [
    {
      title: 'User ID',
      dataIndex: 'userID',
      key: 'userID',
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => (
        <Avatar src={`${baseURL}${imageUrl}`} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (roleName) => {
        let color = roleName === 'Admin' ? 'blue' : roleName === 'Manager' ? 'green' : 'gray';
        return <Tag color={color}>{roleName}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/user-management/${record.userID}`}>
            <a className="text-blue-500">Edit</a>
          </Link>
          <a className="text-red-500">Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row style={{ marginBottom: "10px" }} gutter={[16, 16]} align="middle">
        <Col span={12}>
          <Search placeholder="Search users" onSearch={handleSearch} allowClear />
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <div className="flex space-x-4 justify-end">
            <Button type='primary' onClick={handleAddUser}>Add User <PlusOutlined /></Button>
            <Select
              placeholder="Sort By Role"
              style={{ width: '200px', textAlign: 'left' }}
              onChange={handleSortChange}
              allowClear
            >
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>
          </div>
        </Col>
      </Row>
      <Table
        columns={userManagementColumns}
        dataSource={filteredUsers}
        loading={loading}
        rowKey="userID"
        pagination
      />
      <Modal
        title="Create User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateUser}>
          <Form.Item
            label="First Name"
            name="FirstName"
            rules={[{ required: true, message: 'Please input the first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="LastName"
            rules={[{ required: true, message: 'Please input the last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User Name"
            name="UserName"
            rules={[{ required: true, message: 'Please input the username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="Password"
            rules={[{ required: true, message: 'Please input the password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;