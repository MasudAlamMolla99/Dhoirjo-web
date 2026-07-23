import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  doc,
  getDoc,
  collection,
  query,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import Card from "../components/Card";
// import ReactMarkdown from "react-markdown";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const postBodyRef = useRef(null);

  // Bengali Digits Converter
  const toBnDigits = (str) => {
    const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(str).replace(/\d/g, (d) => BN_DIGITS[d]);
  };

  const convertDigitsInTextNodes = (root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];

    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach((n) => {
      n.nodeValue = toBnDigits(n.nodeValue);
    });
  };

  // Reading Time Calculator
  const getReadingTime = (text) => {
    if (!text) return "০";

    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);

    return toBnDigits(time);
  };

  // Arabic Enhancer
  const enhanceArabic = (container) => {
    const AR_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    const paragraphs = container.querySelectorAll("p");

    paragraphs.forEach((p) => {
      const txt = p.textContent.trim();

      if (!txt) return;

      const arChars = (txt.match(new RegExp(AR_REGEX, "g")) || []).length;
      const ratio = arChars / txt.length;

      if (ratio > 0.6) {
        p.classList.add("text-right", "text-2xl", "leading-loose", "my-8");
        p.setAttribute("dir", "rtl");
      } else if (AR_REGEX.test(txt)) {
        p.innerHTML = p.innerHTML.replace(
          /([\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+)/g,
          '<span class="font-semibold text-teal-900">$1</span>',
        );
      }
    });
  };

  // Fetch Main Post
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      }

      setLoading(false);
    };

    fetchPost();
  }, [id]);

  // Fetch Suggested Posts
  useEffect(() => {
    const fetchSuggested = async () => {
      const q = query(collection(db, "posts"), limit(5));
      const querySnapshot = await getDocs(q);

      const posts = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((p) => p.id !== id)
        .slice(0, 4);

      setSuggestedPosts(posts);
    };

    fetchSuggested();
  }, [id]);

  // Run Text Logic
  useEffect(() => {
    if (!loading && post && postBodyRef.current) {
      enhanceArabic(postBodyRef.current);
      convertDigitsInTextNodes(postBodyRef.current);
    }
  }, [loading, post]);

  // Scroll To Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-lg text-slate-600">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-lg text-red-500">পোস্ট পাওয়া যায়নি!</p>
      </div>
    );
  }
 
const markdown = post.content || post.excerpt;
const isArabic = (text) =>
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);

  return (
    <>
      {/* Main Post */}
   { console.log(markdown)}
      <article className=" bg-gray-50 max-w-4xl mx-auto px-4 py-5 md:py-10">
        <h1 className="text-[clamp(28px,4vw,34px)] md:text-5xl font-bold text-teal-700 leading-relaxed md:leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 border-b border-slate-200 pb-5 mb-8">
          <span>{post.date}</span>
          <span>•</span>
          <span>
            {getReadingTime(post.content || "")} মিনিট সময় লাগবে
          </span>
        </div>

        {post.thumbnail && (
          <figure className="mb-10 overflow-hidden rounded-2xl shadow-lg">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </figure>
        )}

      <div ref={postBodyRef} className="post-body">
 <ReactMarkdown
  components={{
    h1: ({ children }) => {
      const text = String(children);
      const arabic = isArabic(text);

      return (
        <h1
          dir={arabic ? "rtl" : "ltr"}
          className={`text-2xl sm:text-2xl lg:text-4xl font-bold text-teal-700 mt-8 mb-4 leading-tight ${
            arabic ? "text-right font-ar font-bold text-4xl" : "text-left"
          }`}
        >
          {children}
        </h1>
      );
    },

    h2: ({ children }) => {
      const text = String(children);
      const arabic = isArabic(text);

      return (
        <h2
          dir={arabic ? "rtl" : "ltr"}
          className={`text-2xl sm:text-xl lg:text-4xl font-bold text-teal-700 mt-6 mb-3 leading-snug ${
            arabic ? "text-right font-ar font-extrabold" : "text-left"
          }`}
        >
          {children}
        </h2>
      );
    },

    h3: ({ children }) => {
      const text = String(children);
      const arabic = isArabic(text);

      return (
        <h3
          dir={arabic ? "rtl" : "ltr"}
          className={`text-xl sm:text-2xl lg:text-3xl font-semibold text-teal-700 mt-5 mb-2 leading-snug ${
            arabic ? "text-right font-ar font-extrabold" : "text-left"
          }`}
        >
          {children}
        </h3>
      );
    },

    p: ({ children }) => {
      const text = String(children);
      const arabic = isArabic(text);

      return (
      <p
  dir={arabic ? "rtl" : "ltr"}
  className={`mb-4 leading-8 text-[#1c4a4c] ${
    arabic
      ? "text-right font-ar text-4xl font-normal leading-[2.6] md:text-2xl"
      : "text-left text-xl sm:text-lg"
  }`}
>
  {children}
</p>
      );
    },

    ul: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-4 text-base sm:text-lg text-[#1c4a4c]">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-4 text-base sm:text-lg text-[#1c4a4c]">
        {children}
      </ol>
    ),

    li: ({ children }) => {
      const text = String(children);
      const arabic = isArabic(text);

      return (
        <li
          dir={arabic ? "rtl" : "ltr"}
          className={`leading-8 ${
            arabic ? "text-right font-ar font-bold" : "text-left"
          }`}
        >
          {children}
        </li>
      );
    },

    blockquote: ({ children }) => {
      const text = String(children);
      const arabic = isArabic(text);

      return (
        <blockquote
          dir={arabic ? "rtl" : "ltr"}
          className={`my-6 rounded-lg border-l-4 border-gray-300 bg-gray-100 px-4 py-3 italic text-base sm:text-lg text-[#1c4a4c] ${
            arabic ? "text-right font-ar border-r-4 border-l-0 font-extrabold" : "text-left"
          }`}
        >
          {children}
        </blockquote>
      );
    },
  }}
>
  {markdown}
</ReactMarkdown>
</div>
      </article>

      {/* Suggested Posts */}
      {suggestedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20 mt-16 border-t border-slate-200">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-10  mx-4 sm:mx-6 md:mx-8 lg:mx-16">
            আরও পড়ুন
          </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-6 md:mx-8 lg:mx-16 mt-6">
  {suggestedPosts.map((p) => (
    <Card post={p} getReadingTime={getReadingTime} />
  ))}
</div>
        </section>
      )}
    </>
  );
}