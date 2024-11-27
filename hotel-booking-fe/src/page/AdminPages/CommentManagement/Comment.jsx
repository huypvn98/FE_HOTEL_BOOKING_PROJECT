import React, { useState } from "react";
import { Select, Space, Table } from "antd";
import reviewData from "../../../utils/reviewData.json";
import Search from "antd/es/input/Search";

function Comment() {
  const [sortOrder, setSortOrder] = useState(null);

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const sortedData = [...reviewData].sort((a, b) => {
    if (sortOrder === "ascend") {
      return a.rating - b.rating;
    } else if (sortOrder === "descend") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      with: "10%",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      with: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      with: "20%",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => (
        <img
          src={text}
          alt="avatar"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      with: "10%",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (text) => (
        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {text}
        </div>
      ),
      with: "30%",
    },
  ];

  return (
    <div>
      <div className="">
        <h1 className="text-2xl text-gray-500">Customer Review</h1>
      </div>
      <div className="pt-5 space-y-4">
        <div className="">
          <div className="float-right mb-4">
            <Select
              placeholder="Sort By"
              onChange={handleSortChange}
              className="w-[200px]"
            >
              <Select.Option value="ascend">Rating Ascending</Select.Option>
              <Select.Option value="descend">Rating Descending</Select.Option>
            </Select>
          </div>
        </div>
        <Table columns={columns} dataSource={sortedData} pagination></Table>
      </div>
    </div>
  );
}

export default Comment;
