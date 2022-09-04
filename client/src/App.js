import React from "react";
import { Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from './Components/account/Register'
import Login from './Components/account/Login'
import Nav from "./Components/nav/Nav";
import Home from "./Components/home/Home";
import 'antd/dist/antd.css'
import "./App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
