import { Button, Col, Row, Select, Space, Table, Tag } from 'antd';
import React from 'react';
import { userData } from './data';
import Search from 'antd/es/input/Search';
import { PlusOutlined } from '@ant-design/icons';

const UserManagement = () => {
    const userManagementColumns = [
        {
          title: 'User ID',
          dataIndex: 'userId',
          key: 'userId',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          render: (role) => {
            let color = role === 'Admin' ? 'blue' : role === 'Manager' ? 'green' : 'gray';
            return <Tag color={color}>{role}</Tag>;
          },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => {
            let color = status === 'Active' ? 'green' : 'red';
            return <Tag color={color}>{status}</Tag>;
          },
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a>Edit</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];
      
    return (
        <div>
        <Row style={{ marginBottom:"10px",}}>
          <Col span="12" style={{marginRight:"10px"}}>
            <Search></Search>
          </Col>
          <Col style={{marginRight:"10px"}}>
            <Button type='primary'>Add User <PlusOutlined></PlusOutlined></Button>
          </Col>
          <Col style={{marginRight:"10px"}} span="2">
            <Select placeholder="Sort By"></Select>
          </Col>
          <Col style={{marginRight:"10px"}} span="2">
            <Select placeholder="Saved Search"></Select>
          </Col>
        </Row>
            <Table columns={userManagementColumns} dataSource={userData} pagination>

</Table>
        </div>
    );
};

export default UserManagement;