import { Button, Col, Row, Select, Space, Table, Tag } from 'antd';
import React from 'react';
import { refundData } from './refundData';
import { PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';

const RefundManagement = () => {
    const refundColumns = [
        {
          title: 'Refund ID',
          dataIndex: 'refundId',
          key: 'refundId',
        },
        {
          title: 'Booking ID',
          dataIndex: 'bookingId',
          key: 'bookingId',
        },
        {
          title: 'Customer Name',
          dataIndex: 'customerName',
          key: 'customerName',
        },
        {
          title: 'Refund Amount',
          dataIndex: 'refundAmount',
          key: 'refundAmount',
          render: (amount) => `$${amount}`,
        },
        {
          title: 'Refund Status',
          dataIndex: 'refundStatus',
          key: 'refundStatus',
          render: (status) => {
            let color = status === 'Processed' ? 'green' : status === 'Pending' ? 'orange' : 'red';
            return <Tag color={color}>{status}</Tag>;
          },
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a>View</a>
              <a>Cancel</a>
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
            <Button type='primary'>Add Refund <PlusOutlined></PlusOutlined></Button>
          </Col>
          <Col style={{marginRight:"10px"}} span="2">
            <Select placeholder="Sort By"></Select>
          </Col>
          <Col style={{marginRight:"10px"}} span="2">
            <Select placeholder="Saved Search"></Select>
          </Col>
        </Row>
            <Table columns={refundColumns} dataSource={refundData}></Table>
        </div>
    );
};

export default RefundManagement;