import { Button, Col, Row, Select, Space, Table, Tag } from 'antd';
import React from 'react';
import { roomData } from './data';
import Search from 'antd/es/input/Search';
import { PlusOutlined } from '@ant-design/icons';

const HotelManagement = () => {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text, record) => (
            <div>
              <div>{text}</div>
              <div>{record.email}</div>
            </div>
          ),
        },
        {
          title: 'Create Date',
          dataIndex: 'createDate',
          key: 'createDate',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          render: role => {
            let color = role === 'Super Admin' ? 'blue' : role === 'Owner' ? 'blue' : 'gray';
            return (
              <span>
                <Tag color={color} key={role}>
                  {role}
                </Tag>
              </span>
            );
          },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
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
            <Button type='primary'>Add Owner <PlusOutlined></PlusOutlined></Button>
          </Col>
          <Col style={{marginRight:"10px"}} span="2">
            <Select placeholder="Sort By"></Select>
          </Col>
          <Col style={{marginRight:"10px"}} span="2">
            <Select placeholder="Saved Search"></Select>
          </Col>
        </Row>
            <Table columns={columns} dataSource={roomData} pagination>

            </Table>
        </div>
    );
};

export default HotelManagement;
