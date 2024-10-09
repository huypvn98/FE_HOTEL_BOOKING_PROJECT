import { Button, Col, Row, Select, Space, Table, Tag } from 'antd';
import React from 'react';
import { bookingData } from './bookingData';
import { PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';

const BookingDetail = () => {
    const bookingColumns = [
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
          title: 'Room Type',
          dataIndex: 'roomType',
          key: 'roomType',
        },
        {
          title: 'Check-In Date',
          dataIndex: 'checkInDate',
          key: 'checkInDate',
        },
        {
          title: 'Check-Out Date',
          dataIndex: 'checkOutDate',
          key: 'checkOutDate',
        },
        {
          title: 'Amount Paid',
          dataIndex: 'amountPaid',
          key: 'amountPaid',
          render: (amount) => `$${amount}`,
        },
        {
          title: 'Booking Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => {
            let color = status === 'Confirmed' ? 'green' : status === 'Pending' ? 'orange' : 'red';
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
            <Button type='primary'>Add Booking Detail <PlusOutlined></PlusOutlined></Button>
          </Col>
          <Col style={{marginRight:"10px"}} span="2">
            <Select placeholder="Sort By"></Select>
          </Col>
          <Col style={{marginRight:"10px"}} span="2">
            <Select placeholder="Saved Search"></Select>
          </Col>
        </Row>
            <Table columns={bookingColumns} dataSource={bookingData} pagination>

</Table>
        </div>
    );
};

export default BookingDetail;