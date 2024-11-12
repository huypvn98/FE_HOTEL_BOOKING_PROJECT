import React from "react";
import { Button, Col, Row, Select, Space, Table, Tag } from "antd";
import { roomData } from "./RoomData.js";
import { PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { Link } from "react-router-dom";

const RoomManagement = () => {
  const columns = [
    {
      title: "Room ID",
      dataIndex: "RoomID",
      key: "RoomID",
    },
    {
      title: "Room Number",
      dataIndex: "RoomNumber",
      key: "RoomNumber",
    },
    {
      title: "Room Square",
      dataIndex: "RoomSquare",
      key: "RoomSquare",
    },
    {
      title: "Is Active",
      dataIndex: "IsActive",
      key: "IsActive",
      render: (status) => {
        let color =
          status === "Active"
            ? "green"
            : status === "Inactive"
            ? "red"
            : "gray";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/room-management/${record.RoomID}`}>
            <a className="text-blue-500">Edit</a>
          </Link>
          <a className="text-red-500">Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="pt-10">
        <h1 className="text-2xl text-gray-500">Room Management</h1>
      </div>
      <div className="pt-10 space-y-4">
        <div className="grid grid-cols-12 gap-4 mb-2">
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <Search />
          </div>
          <div className="col-span-6 md:col-span-2 lg:col-span-2">
            <Select placeholder="Sort By" />
          </div>
          <div className="col-span-12 md:col-span-4 lg:col-span-4 flex justify-end">
            <Button type="primary">
              Add Room <PlusOutlined />
            </Button>
          </div>
        </div>
        <Table columns={columns} dataSource={roomData} pagination></Table>
      </div>
    </div>
  );
};

export default RoomManagement;