import Navbar from "./components/Navbar";
import React from "react";
import HeroSection from "./components/HerSection";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="flex gap-3 p-8">
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
      </div>
    </>
  );
};

export default App;
