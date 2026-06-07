import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import "./App.css"
import Post from "./pages/Post";

function App() {
  return (
    <>
    <Navbar/>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
           <Route path="/post/:id" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
    </>
  );
}

export default App;