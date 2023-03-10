import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Form } from "antd";
import { logIn } from "../../reducers/login";
import { Error } from "../../Components/alert/Alert";

import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [log, setLogIn] = useState({
    // userName: "",
    email: "",
    password: "",
  });

  const userLog = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/login`,
        log
      );
      const data = {
        token: result.data.token,
        user: result.data.result,
      };
      dispatch(logIn(data));
      navigate("/", { replace: true });
      // window.location.reload(true);
    } catch (error) {
      console.log(error.response);
      setError(true);
      setErrorMsg(error.response.data);
    }
  };

  return (
    <div className="login-container">
      {error ? <Error message={errorMsg} /> : <></>}
      <h1>تسجيل الدخول</h1>
      <Form
        className="login-form"
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        // initialValues={{
        //   remember: true,
        // }}
        autoComplete="off"
      >
        {/* Email Field */}
        <Form.Item
          label="البريد الإلكتروني"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            value={log.email}
            onChange={(ev) => setLogIn({ ...log, email: ev.target.value })}
          />
        </Form.Item>
        {/* Password Field */}
        <Form.Item
          label="كلمة المرور"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            value={log.password}
            onChange={(ev) => setLogIn({ ...log, password: ev.target.value })}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button appearance="primary" onClick={userLog}>
            تسجيل الدخول
          </Button>
        </Form.Item>
        <Link to="/forget" className="password-link">
          نسيت كلمة السر؟
        </Link>
        <h4>
          ليس لديك حساب؟
          <Link to="/register" className="register-btn">
            تسجيل جديد
          </Link>
        </h4>
      </Form>
    </div>
  );
};

export default Login;
