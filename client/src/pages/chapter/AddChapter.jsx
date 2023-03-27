import React, { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import "./add.css";
const AddChapter = ({ storyId, children }) => {
  const chapterTitleRef = useRef();
  const chapterNumeRef = useRef();
  const chapterContentRef = useRef();
  const state = useSelector((state) => {
    return state;
  });

  const newChapter = async (chapterNume, chapterTitle, chapterContent) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/chapter/new`,
        {
          part: chapterNume,
          title: chapterTitle,
          chapterContent: chapterContent,
          storyId: storyId,
        },

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
  // art, title, chapterContent, storyId

  const onSubmitHandle = (e) => {
    e.preventDefault();
    const chapterNume = chapterNumeRef.current.value;
    const chapterTitle = chapterTitleRef.current.value;
    const chapterContent = chapterContentRef.current.value;
    console.log(chapterNume, chapterTitle, chapterContent);
    newChapter(chapterNume, chapterTitle, chapterContent);
  };

  return (
    <div className="modal-continer">
      <div className="container">
        <h1>إضافة فصل </h1>
        <form onSubmit={onSubmitHandle}>
          <label htmlFor="chapter-num">رقم الفصل:</label>
          <input
            ref={chapterNumeRef}
            type="number"
            name="chapter-num"
            id="chapter-num"
            required
          />
          <label htmlFor="chapter-title">عنوان الفصل: </label>
          <input
            ref={chapterTitleRef}
            type="text"
            name="chapter-title"
            id="chapter-title"
            required
          />
          <label htmlFor="chapter-content">محتوى الفصل: </label>
          <textarea
            ref={chapterContentRef}
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
