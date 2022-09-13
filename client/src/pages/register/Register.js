import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Input, Form, message } from "antd";
import "./style.css";
import Modal from "../../Components/modal/Modal";
const Register = () => {
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
    role: "61a82ae32b8f8814ee629665",
  });

  const creatUser = async () => {
    try {
      // eslint-disable-next-line
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register`,
        register
      );
      setRegister(" ");
      message.success("Please Activate Your Email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <h1>تسجيل حساب جديد</h1>
      <Form
        className="register-form"
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        autoComplete="off"
      >
        {/* User Name Field */}
        <Form.Item
          label="إسم المستخدم"
          name="userName"
          rules={[
            {
              required: true,
              message: "Please Enter your User Name!",
            },
          ]}
        >
          <Input
            value={register.userName}
            onChange={(ev) =>
              setRegister({ ...register, userName: ev.target.value })
            }
          />
        </Form.Item>
        {/* Email Field */}
        <Form.Item
          label="البريد الإلكتروني"
          name="email"
          rules={[
            {
              required: true,
              message: "Please Enter your Email!",
            },
          ]}
        >
          <Input
            value={register.email}
            onChange={(ev) =>
              setRegister({ ...register, email: ev.target.value })
            }
          />
        </Form.Item>
        {/* Password Field */}
        <Form.Item
          label="كلمة المرور"
          name="password"
          rules={[
            {
              required: true,
              message: "الرجاء إدخال كلمة المرور!",
            },
          ]}
        >
          <Input.Password
            value={register.password}
            onChange={(ev) =>
              setRegister({ ...register, password: ev.target.value })
            }
          />
        </Form.Item>
        <Button appearance="primary" onClick={creatUser}>
          تسجيل
        </Button>
        <h4>
          هل لديك حساب؟
          <Link to="/login" className="login-btn">
            تسجيل الدخول
          </Link>
        </h4>
      </Form>
    </div>
  );
};

export default Register;
