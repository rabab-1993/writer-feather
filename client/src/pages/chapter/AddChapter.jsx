import React, {useEffect, useRef} from "react";
import axios from "axios";
import { useSelector } from "react-redux";


import "./add.css";
const AddChapter = ({ children }) => {
  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    const newChapter = async () => {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/schapter/new`,

          {
            headers: {
              Authorization: `Bearer ${state.signIn.token}`,
            },
          }
        );
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    newChapter();
  }, []);
  // art, title, chapterContent, storyId
  const first = useRef()

  return (
    <div className="modal-continer">
      <div className="container">
        <h1>إضافة فصل </h1>
        <form onChange={(e)=> console.log(e.target.value)}>
          <label htmlFor="chapter-num">رقم الفصل:</label>
          <input type="number" name="chapter-num" id="chapter-num" required />
          <label htmlFor="chapter-title">عنوان الفصل: </label>
          <input type="text" name="chapter-title" id="chapter-title" required />
          <label htmlFor="chapter-content">محتوى الفصل: </label>
          <textarea
            name="chapter-content"
            id="chapter-content"
            cols="60"
            rows="20"
            required
          ></textarea>
          {children}
        </form>
      </div>
    </div>
  );
};

export default AddChapter;
