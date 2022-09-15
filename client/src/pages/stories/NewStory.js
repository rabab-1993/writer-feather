import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select, Upload } from "antd";
import { BiUpload } from "react-icons/bi";

import "./NewStory.css";

const NewStory = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const state = useSelector((state) => {
    return state;
  });
  // console.log(state.signIn.token);
  useEffect(() => {
    if (!state.signIn.token) {
      navigate("/login");
    }
  }, []);
  const [data, setData] = useState({
    // userName: "",
    email: "",
    password: "",
  });
  const { Option } = Select;
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

  const newStory = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/stories/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    console.log(value);
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
            value={categories}
            onChange={(ev) => console.log(ev)}
          >
            {categories.map((category, i) => (
              <Option value={category} key={i}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
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
