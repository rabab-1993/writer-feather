import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";

import "./style.css";
import Search from "../search/Search";
const Nav = () => {
  const [current, setCurrent] = useState("");
  const items = [
    // {
    //   label: <Link to="/"><h1>ريشة كاتب</h1></Link>,

    //   key: "logo",
    //   //   icon: <MailOutlined />,
    // },
    {
      label: 'التصنيفات', 
      key: 'SubMenu',
      children: [
        {
          label: 'اكشن',
          key: 'action',
        },
        {
          label: 'رومانسي',
          key: 'romance',
        },
        {
          label: 'خيال',
          key: 'fantasy',
        },
        {
          label: 'غموض',
          key: 'mystery',
        },
        {
          label: 'رعب',
          key: 'horror',
        },
        {
          label: 'مفامرة',
          key: 'adventure',
        },
        {
          label: 'خوارق',
          key: 'paranormal',
        },
        {
          label: 'إثارة',
          key: 'Thriller',
        },
        {
          label: 'مستذئب',
          key: 'werewolf',
        },
        {
          label: 'مصاص دماء',
          key: 'vampire',
        },
        {
          label: 'دراما',
          key: 'drama',
        },
      ]
    },
    // {
    //   label: (
    //     <Button shape="round">
    //       {" "}
    //       <Link to="/login">تسجيل الدخول</Link>
    //     </Button>
    //   ),
    //   key: "login",
    //   //   icon: <MailOutlined />,
    // },
    // {
    //   label: (
    //     <Button shape="round">
    //       <Link to="/register">تسجيل جديد</Link>
    //     </Button>
    //   ),

    //   key: "register",
    //   //   icon: <MailOutlined />,
    // },
  ];
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="nav">
      <Link to="/" className="logo">
        <h1>ريشة كاتب</h1>
      </Link>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{textAlign: 'right'}}
        items={items}
        className='menu'
      />
      <Search />
       <Button shape="round">
          <Link to="/login">تسجيل الدخول</Link>
        </Button>
       <Button shape="round">
          <Link to="/register">تسجيل جديد</Link>
        </Button>
    </div>
  );
};

export default Nav;
