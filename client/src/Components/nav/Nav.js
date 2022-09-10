import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { BsPencilSquare } from "react-icons/bs";
import Search from "../search/Search";

import "./style.css";

const Nav = () => {
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

  // const items = [
  //   {
  //     label: "التصنيفات",
  //     key: "SubMenu",
  //     children: [
  //       m(),

  //       // {
  //       //   label: (
  //       //     <Link
  //       //       to={`/Category/action`}
  //       //       // state={{ Category: item._id }}
  //       //     >
  //       //       اكشن
  //       //     </Link>
  //       //   ),
  //       //   key: "action",
  //       // },
  //       // {
  //       //   label: "رومانسي",
  //       //   key: "romance",
  //       // },
  //       // {
  //       //   label: "خيال",
  //       //   key: "fantasy",
  //       // },
  //       // {
  //       //   label: "غموض",
  //       //   key: "mystery",
  //       // },
  //       // {
  //       //   label: "رعب",
  //       //   key: "horror",
  //       // },
  //       // {
  //       //   label: "مفامرة",
  //       //   key: "adventure",
  //       // },
  //       // {
  //       //   label: "خوارق",
  //       //   key: "paranormal",
  //       // },
  //       // {
  //       //   label: "إثارة",
  //       //   key: "Thriller",
  //       // },
  //       // {
  //       //   label: "مستذئب",
  //       //   key: "werewolf",
  //       // },
  //       // {
  //       //   label: "مصاص دماء",
  //       //   key: "vampire",
  //       // },
  //       // {
  //       //   label: "دراما",
  //       //   key: "drama",
  //       // },
  //     ],
  //   },
  // ];
  // const onClick = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };

  return (
    <div className="nav">
      <Link to="/" className="logo">
        <h1>ريشة كاتب</h1>
      </Link>
      <ul className="dropdown">
        <h3>
          التصنيفات<span>&#9662;</span>
        </h3>
        <div className="dropdown-content">
          {categories.map((category, i) => {
            return (
              <Link to={`/category/${category}`} state={{ Category: categories }} key={i}>
                {category}
              </Link>
            );
          })}
        </div>
      </ul>
      {/* <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ textAlign: "right" }}
        items={items}
        className="menu"
      /> */}
      <Link to="/mystories/new" style={{color: '#e29578'}}>
        اكتب قصة <BsPencilSquare />
      </Link>
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
