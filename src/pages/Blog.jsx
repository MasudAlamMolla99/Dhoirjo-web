import { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";
import Card from "../components/Card";
import Loader from "../components/Loader";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // URL PARAMETERS
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");
  const categoryFilter = searchParams.get("c");
  const tagFilter = searchParams.get("t");

  // --- 1. Helper: Convert Numbers to Bangla ---
  const toBnDigits = (str) => {
    const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(str).replace(/\d/g, (d) => BN_DIGITS[d]);
  };

  // --- 2. Helper: Calculate Reading Time ---
  const getReadingTime = (text) => {
    if (!text) return "০";
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return toBnDigits(time);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort by newest first
      postsData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      setPosts(postsData);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // --- FILTERING LOGIC ---
  useEffect(() => {
    if (categoryFilter) {
      setFilteredPosts(posts.filter((p) => p.category === categoryFilter));
    } else if (tagFilter) {
      setFilteredPosts(
        posts.filter((p) => p.tags && p.tags.includes(tagFilter)),
      );
    } else {
      setFilteredPosts(posts);
    }
    setCurrentPage(1);
  }, [categoryFilter, tagFilter, posts]);

  // --- PAGINATION CALCULATIONS ---
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // --- PAGINATION UI LOGIC (The "..." Logic) ---
  const getPageNumbers = () => {
    const pageNumbers = [];
    const siblingCount = 2; // How many numbers to show next to current page

    // 1. Always show Page 1
    pageNumbers.push(1);

    // 2. Add "..." if we are far from page 1
    if (currentPage > siblingCount + 2) {
      pageNumbers.push("...");
    }

    // 3. Add neighbors (e.g. if current is 7, add 5, 6, 7, 8, 9)
    let start = Math.max(2, currentPage - siblingCount);
    let end = Math.min(totalPages - 1, currentPage + siblingCount);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    // 4. Add "..." if we are far from the last page
    if (currentPage < totalPages - siblingCount - 1) {
      pageNumbers.push("...");
    }

    // 5. Always show Last Page (if there is more than 1 page)
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // --- VIEW 1 & 2 (Categories/Tags) remain the same...
  if (view === "categories") {
    const categories = [
      ...new Set(posts.map((p) => p.category).filter(Boolean)),
    ];
    return (
      <div className="container">
        <h1>Categories</h1>
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}>
          {categories.map((cat) => (
            <Link key={cat} to={`/?c=${cat}`} className="btn-outline-black">
              {cat}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (view === "tags") {
    const tags = [...new Set(posts.flatMap((p) => p.tags || []))];
    return (
      <div className="container">
        <h1>Tags</h1>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}>
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/?t=${tag}`}
              style={{
                padding: "8px 16px",
                background: "#eee",
                borderRadius: "20px",
                textDecoration: "none",
                color: "black",
              }}>
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    );
  }


  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-6 md:mx-8 lg:mx-24 mt-6">
      {categoryFilter && <h2>Category: {categoryFilter}</h2>}
      {tagFilter && <h2>Tag: #{tagFilter}</h2>}

   {currentPosts.map((post) => (
  <Card post={post} getReadingTime={getReadingTime} key={post.id}/>
))}

   
      {totalPages > 1 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "60px",
            gridColumn: "1 / -1",
          }}>
          {getPageNumbers().map((number, index) => {
            if (number === "...") {
              return (
                <span key={index} style={{ fontSize: "18px", color: "#888" }}>
                  ...
                </span>
              );
            }

            return (
             <button
  key={index}
  onClick={() => paginate(number)}
  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-md text-lg font-bold transition-all duration-200
    ${
      currentPage === number
        ? "bg-blue-700 text-white shadow-sm"
        : "bg-slate-200 text-gray-800 hover:bg-blue-100 hover:text-blue-700"
    }`}
>
  {toBnDigits(number)}
</button>
            );
          })}
        </div>
      )}
    </div>
  );
}
