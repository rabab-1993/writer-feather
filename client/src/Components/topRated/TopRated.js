import React, { useState } from "react";
import Slider from "react-slick";
import { Rate } from "antd";
import { FaTimes } from "react-icons/fa";
import Modal from "../modal/Modal";
import "./style.css";

const TopRated = () => {
  const [modal, setModal] = useState(false);
  const data = [
    {
      id: 1,
      title: "gjhgjkh",
      cover: "https://m.media-amazon.com/images/I/51httki9EbL.jpg",
      rate: 5,
      author: "jhgjhgj",
      state: "مكتمل",
    },
    {
      id: 2,
      title: "gjhgjkh",
      cover: "https://m.media-amazon.com/images/I/51httki9EbL.jpg",
      rate: 5,
      author: "jhgjhgj",
      state: "غير مكتمل",
    },
    {
      id: 3,
      title: "gjhgjkh",
      cover: "https://m.media-amazon.com/images/I/51httki9EbL.jpg",
      rate: 4,
      author: "jhgjhgj",
      state: "مكتمل",
    },
    {
      id: 4,
      title: "gjhgjkh",
      cover: "https://m.media-amazon.com/images/I/51httki9EbL.jpg",
      rate: 3.5,
      author: "jhgjhgj",
      state: "مكتمل",
    },
    {
      id: 5,
      title: "gjhgjkh",
      cover: "https://m.media-amazon.com/images/I/51httki9EbL.jpg",
      rate: 4.4,
      author: "jhgjhgj",
      state: "غير مكتمل",
    },
    {
      id: 6,
      title: "gjhgjkh",
      cover: "https://m.media-amazon.com/images/I/51httki9EbL.jpg",
      rate: 5,
      author: "jhgjhgj",
      state: "غير مكتمل",
    },
    {
      id: 7,
      title: "gjhgjkh",
      cover: "https://m.media-amazon.com/images/I/51httki9EbL.jpg",
      rate: 3.3,
      author: "jhgjhgj",
      state: "مكتمل",
    },
    {
      id: 8,
      title: "gjhgjkh",
      cover: "https://m.media-amazon.com/images/I/51httki9EbL.jpg",
      rate: 4.2,
      author: "jhgjhgj",
      state: "غير مكتمل",
    },
    {
      id: 9,
      title: "gjhgjkh",
      cover: "https://m.media-amazon.com/images/I/51httki9EbL.jpg",
      rate: 3.9,
      author: "jhgjhgj",
      state: "مكتمل",
    },
    {
      id: 10,
      title: "gjhgjkh",
      cover: "https://m.media-amazon.com/images/I/51httki9EbL.jpg",
      rate: 4.8,
      author: "jhgjhgj",
      state: "غير مكتمل",
    },
  ];
  // for Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <div className="top-rated">
        <h1>Top Rated</h1>
        <Slider {...settings}>
          {data.map((item) => (
            <div key={item.id} className="book">
              <img src={item.cover} alt="" onClick={openModal} />
              <h2>{item.title}</h2>
              <h5>{item.author} :بريشة</h5>
              <Rate
                allowHalf
                disabled
                value={item.rate}
                className="rate-icon"
              />
            </div>
          ))}
        </Slider>
      </div>
      {/* Opining a Modal */}
      {modal ? (
        <div className="modal-continer">
          <FaTimes className="close-bttn" onClick={closeModal} /> <Modal />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopRated;
