import React from "react";
import { Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from './pages/account/Register'
import Login from './pages/account/Login'
import Nav from "./Components/nav/Nav";
import Home from "./Components/home/Home";
import Category from "./pages/categories/Category";
import NewStory from "./pages/stories/NewStory";

import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/category/:category" element={<Category />} />
        <Route exact path="/mystories/new" element={<NewStory />} />
      </Routes>
    </div>
  );
}

export default App;
