import React from "react";
import Hero from "../hero/Hero";
import TopRated from "../topRated/TopRated";
import "./style.css";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <TopRated />
    </div>
  );
};

export default Home;
