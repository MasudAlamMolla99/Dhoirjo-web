import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import "./App.css";
import Post from "./pages/Post";
import Qns from "./pages/Qns";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import AdminPanel from "./pages/AdminPanel";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/auth/Register";

function App() {
  return (
    <>
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Q&A Page with User Question Submission & Admin Answer controls */}
        <Route path="/qns" element={<Qns />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<UserProfile />} />


        {/* This is for Writing a NEW post */}
        <Route path="/admin/create" element={<CreatePost />} />

        {/* This is for Editing an OLD post */}
        <Route path="/admin/edit/:id" element={<EditPost />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;