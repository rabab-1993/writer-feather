import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./myStories.css";
const MyStories = () => {
  const [data, setData] = useState([]);
  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    const myStories = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/story/storyBy?authorId=${state.signIn.id}`,

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
    myStories();
  }, []);

  return (
    <div className="myStories-container">
      <h2>قصصي</h2>
      <div className="stories">
        {data.map((item) => (
          <div key={item._id} className="story">
            <Link to={`/story/${item.title}`}>
              <img src={item.cover} alt="" />
            </Link>
            <h3>{item.title}</h3>
            <h5 style={{ color: "#a9a3a3" }}>{item.status}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStories;
