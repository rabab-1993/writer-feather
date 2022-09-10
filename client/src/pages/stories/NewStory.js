import React from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import { BiUpload } from "react-icons/bi";

import "./NewStory.css";

const NewStory = () => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const categories = [
    "رومانسي",
    "خيال",
    "غموض",
    "رعب",
    "مفامرة",
    "خارق للطبيعة",
    "إثارة",
    "مستذئب",
    "مصاص دماء",
    "دراما",
    "أكشن",
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="new-story-container">
      <h1>إنشاء قصة جديدة:</h1>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="العنوان"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="التصنيف"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            // initialValues={["a10", "c12"]}
            onChange={handleChange}
          >
            {categories.map((category, i) => (
              <Select.Option key={i}>{category}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="intro"
          label="وصف"
          rules={[
            {
              required: true,
              message: "الرجاء إضافة وصف",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="upload"
          label="غلاف القصة"
          valuePropName="fileList"
          // getValueFromEvent={normFile}
        >
          <Upload name="cover" action="/upload.do" listType="picture">
            <Button>
              <BiUpload />
            </Button>
          </Upload>
        </Form.Item>
        <Button htmlType="submit">إنشاء</Button>
      </Form>
    </div>
  );
};

export default NewStory;
