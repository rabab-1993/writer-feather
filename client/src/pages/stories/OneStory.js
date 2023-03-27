import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { GrChapterAdd } from "react-icons/gr";
import { Warning } from "../../Components/alert/Alert";
import "./oneStory.css";
import AddChapter from "../chapter/AddChapter";
const OneStory = () => {
  let { title } = useParams();
  const [data, setData] = useState([]);
  const [chaptersData, setChaptersData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deleteStoryHandle, setDeleteStoryHandle] = useState(false);
  const [showChapterForm, setShowChapterForm] = useState(false);
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    const findStory = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/story/oneStory?tittle=${title}`
        );
        setData(result.data);
        setCategories(result.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    findStory();
    if (data._id) {
      const chapters = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/chapter?storyId=${data._id}`
          );
          setChaptersData(result.data);
          console.log(result.data);
        } catch (error) {
          console.log(error);
        }
      };
      chapters();
    }
  }, [title, state.signIn.token, data._id]);

  const deleteStory = async (id) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/story/delete?_id=${id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(result.data);
      navigate("/mystories");
    } catch (error) {
      console.log(error);
    }
  };

  const category = [];
  categories.forEach((item) => {
    category.push(
      <Link to={`/category/${item}`} key={item} className="link">
        {item},{" "}
      </Link>
    );
  });

  const newChapter = () => {
    setShowChapterForm(true);
  };

  return (
    <>
      <div className="one-story">
        <img src={data.cover} alt="story cover" />
        <div className="texts">
          <h2>عنوان القصة: {data.title}</h2>
          <h5>حالة القصة: {data.status}</h5>
          <h4>
            التصنيف:
            {category}
          </h4>
          <b>
            وصف القصة:
            <p>{data.description}</p>
          </b>
        </div>
        <span className="trash" onClick={() => setDeleteStoryHandle(true)}>
          <BsTrash />
          <h4>حذف</h4>
        </span>
        <span className="add" onClick={newChapter}>
          <GrChapterAdd />
          <h4 style={{ fontSize: "0.8em" }}>فصل جديد</h4>
        </span>
        <h3>الفصول ({chaptersData.length}) :</h3>
        {chaptersData.map((item) => (
          <Link
            to={`/${title}/chapter/${item.part}`}
            key={item}
            className="chapter"
          >
            {item.part}
          </Link>
        ))}
      </div>
      {showChapterForm && (
        <AddChapter storyId={data._id}>
          <input
            type="button"
            value="إلغاء"
            onClick={() => setShowChapterForm(false)}
          />
          <input
            type="submit"
            value="نشر"
            onClick={() => {
              setShowChapterForm(false);
              // findStory();
            }}
          />
        </AddChapter>
      )}
      {deleteStoryHandle && (
        <Warning message="هل انت متأكد من حذف القصة؟">
          <input
            type="button"
            value="حذف"
            className="bttn"
            onClick={() => deleteStory(data._id)}
          />
          <input
            type="button"
            value="إلغاء"
            onClick={() => setDeleteStoryHandle(false)}
          />
        </Warning>
      )}
    </>
  );
};

export default OneStory;
