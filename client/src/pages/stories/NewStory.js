import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select, Image } from "antd";
import { BiUpload } from "react-icons/bi";

import "./NewStory.css";

const NewStory = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [value, setvalue] = useState("");
  const state = useSelector((state) => {
    return state;
  });
  // console.log(state.signIn.token);
  useEffect(() => {
    if (!state.signIn.token) {
      navigate("/login");
    }
  }, []);
  // const [data, setData] = useState({
  //   author: "",
  //   description: "",
  //   cover: "",
  //   title: "",
  //   category: [],
  // });
  const [data, setData] = useState({});
  const [coverPreview, setCoverPreview] = useState("");
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
    "مغامرة",
    "خارق للطبيعة",
    "إثارة",
    "مستذئب",
    "مصاص دماء",
    "دراما",
    "أكشن",
  ];

  //  for convert images to Base64
  const getBase64 = async (file) => {
    await new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(setData({ ...data, cover: reader.result }));
        setCoverPreview(reader.result);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const newStory = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/story`,
        data,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(result.data);
      setCoverPreview(" ");
      setData(" ");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleChange = (values) => {
  //   // let selectedValue = [];
  //   // let value = Array.from(
  //   //   values.target.selectedOptions,
  //   //   (option) => option.value
  //   // );
  //   // selectedValue.push(values);
  //   console.log(values.target);

  //   setData({
  //     ...data,
  //     author: state.signIn.id,
  //     description: values.description,
  //     cover: coverPreview,
  //     title: values.title,
  //     category: values.category,
  //   });
  // };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((values) => ({
      ...values,
      author: state.signIn.id,
      // title: value,
      // cover: coverPreview,
      // description: value,
      [name]: value,
    }));
  };

  const onFinish = (values) => {
    values.preventDefault();
    newStory();
  };

  console.log(data);
  return (
    <div className="new-story-container">
      <h1>إنشاء قصة جديدة:</h1>
      <form onSubmit={onFinish} onChange={handleChange}>
        <label>
          العنوان:
          <input
            type="text"
            name="title"
            value={data.title}
            // onChange={(ev) => setData({ ...data, title: ev.target.value })}
            required
          />
        </label>

        <label className="category">
          التصنيف:
          <Select
            mode="multiple"
            style={{
              width: "50%",
            }}
            placeholder="الرجاء إختيار التصنيف"
            // value={categories}
            onChange={(ev) => setData({ ...data, category: ev })}
          >
            {categories.map((category, i) => (
              <Option value={category} key={i}>
                {category}
              </Option>
            ))}
          </Select>
        </label>

        <label className="description">
          وصف:
          <textarea type="text" name="description" value={data.description} />
        </label>
        <label htmlFor="">
          غلاف القصة:
          <input
            type="file"
            // value={coverPreview}
            onChange={(e) => getBase64(e.target.files[0])}
          />
          {coverPreview ? (
            <Image src={coverPreview} alt="" className="cover" />
          ) : (
            <></>
          )}
        </label>
        <button type="submit">إنشاء</button>
      </form>
      {/* <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        onValuesChange={handleChange}
      >
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
            // onChange={(ev) => console.log(ev)}
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
          name="cover"
          label="غلاف القصة"
          valuePropName="cover"
          getValueFromEvent={(e) => getBase64(e.target.files[0])}
        >
          <input type="file" name="cover" id="" />
        </Form.Item>
        {coverPreview ? (
          <Image src={coverPreview} alt="" className="cover" />
        ) : (
          <></>
        )}
        <Button htmlType="submit">إنشاء</Button>
      </Form> */}
    </div>
  );
};

export default NewStory;
