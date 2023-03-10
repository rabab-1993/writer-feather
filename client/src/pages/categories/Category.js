import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Category = () => {
  let { category } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const categories = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/story/storyBy?category=${category}`
        );
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    categories();
  }, [category]);

  return (
    <div>
      Category
      {category}
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

export default Category;
