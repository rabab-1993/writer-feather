import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";

import "./style.css";
const Nav = () => {
  const [current, setCurrent] = useState("");
  const items = [
    {
      label: (
        <Link to="/">
          {" "}
          <h1>ريشة كاتب</h1>
        </Link>
      ),

      key: "logo",
      //   icon: <MailOutlined />,
    },
    {
      label: (
        <Button shape="round">
          {" "}
          <Link to="/login">تسجيل الدخول</Link>
        </Button>
      ),
      key: "login",
      //   icon: <MailOutlined />,
    },
    {
      label: (
        <Button shape="round">
          <Link to="/register">تسجيل جديد</Link>
        </Button>
      ),

      key: "register",
      //   icon: <MailOutlined />,
    },
  ];
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="nav">
      <Layout.Header>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <Link to="/"></Link>
      </Layout.Header>
    </div>
  );
};

export default Nav;
