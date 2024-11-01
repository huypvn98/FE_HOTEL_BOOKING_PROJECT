import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Form, Image, Input, Row } from "antd";

function UserProfile() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };


  return (
    <div className="mx-[400px] my-[150px] py-8">
      <Row gutter={16}>
        <Col span={12}>
          <Image
            src="https://cafefcdn.com/203337114487263232/2023/12/28/36015395459431168491282614835739769126073234n-2005-1703766141844-1703766142873901375840.jpg"
            width={400}
          />
        </Col>
        <Col span={12}>
          <Form form={form}  layout="vertical">
            <Form.Item label="Member Name" name="membername">
              <Input readOnly={!isEditing} />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input readOnly={!isEditing} />
            </Form.Item>
            <Form.Item label="Birth Year" name="YOB">
              <Input readOnly={!isEditing} />
            </Form.Item>
            <Form.Item>
              {isEditing ? (
                <div className="space-x-6">
                  <Button
                    type="primary"
                    oading={loading}
                    // onClick={handleUpdate}
                  >
                    Submit
                  </Button>
                  <Button type="primary" onClick={handleCancel}>
                    Close
                  </Button>
                </div>
              ) : (
                <div >
                  <Button type="primary" onClick={handleEdit} className="w-full">
                    Edit
                  </Button>
                </div>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
