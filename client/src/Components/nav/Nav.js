import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { logOut } from "../../reducers/login";
import Search from "../search/Search";
import "./style.css";

const Nav = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
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
  useEffect(() => {
    if (state.signIn.id) {
      const userInfo = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/user/profile?_id=${state.signIn.id}`,
            {
              headers: {
                Authorization: `Bearer ${state.signIn.token}`,
              },
            }
          );
          setData(result.data);
        } catch (error) {
          console.log(error);
        }
      };
      userInfo();
    }
    // eslint-disable-next-line
  }, [state.signIn]);

  const signOut = () => {
    navigate("/");
    dispatch(logOut());
  };

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
              <Link
                to={`/category/${category}`}
                state={{ Category: categories }}
                key={i}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </ul>
      <Link to="/mystories/new" style={{ color: "#e29578" }}>
        اكتب قصة <BsPencilSquare />
      </Link>
      <Search />
      {state.signIn.token ? (
        data.map((info) => (
          <div key={info._id} className="user-info">
            <h4>
              مرحباً! <span style={{ color: "#006D77" }}>{info.userName}</span>
            </h4>
            <img src={info.avatar} alt="" className="avatar" />
            <ul className="dropdown-profile">
              <li>
                <Link to="/mystories">قصصي</Link>
              </li>
              <li>
                <Link to="/profile">الحساب</Link>
              </li>
              <li onClick={signOut}>
                تسجيل الخروج <MdOutlineLogout />
              </li>
            </ul>
          </div>
        ))
      ) : (
        <>
          <Button shape="round">
            <Link to="/login">تسجيل الدخول</Link>
          </Button>
          <Button shape="round">
            <Link to="/register">تسجيل جديد</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default Nav;
