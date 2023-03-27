import React from "react";
import { Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Nav from "./Components/nav/Nav";
import Footer from "./Components/footer/Footer";
import Home from "./Components/home/Home";
import Category from "./pages/categories/Category";
import MyStories from "./pages/stories/MyStories";
import NewStory from "./pages/stories/NewStory";
import Profile from "./pages/account/Profile";
import Chapter from "./pages/chapter/Chapter";
import OneStory from "./pages/stories/OneStory";

import "antd/dist/antd.js";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/category/:category" element={<Category />} />
        <Route exact path="/mystories" element={<MyStories />} />
        <Route exact path="/mystories/new" element={<NewStory />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/story/:title" element={<OneStory />} />
        <Route exact path="/:title/chapter/:part" element={<Chapter />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
