import React, { useState } from 'react';
import { Upload, Button, message, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function UploadForm() {
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList }) => setFileList([...fileList]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', fileList[0].originFileObj);

    try {
      const response = await axios.post("http://localhost:4000/service", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        message.success(response.data);
        setFileList([]);
      } else {
        message.error("Error.");
      }
    } catch (error) {
      message.error("Error uploading file.");
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Upload File">
        <Upload
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={() => false} // Prevents auto uploading
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default UploadForm;


