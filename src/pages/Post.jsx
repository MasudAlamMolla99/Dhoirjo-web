import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
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

  return (
    <>
      {/* Main Post */}
      <article className="max-w-4xl mx-auto px-4 py-5 md:py-10">
        <h1 className="text-[clamp(28px,4vw,34px)] md:text-5xl font-bold text-teal-800 leading-relaxed md:leading-tight mb-6">
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

        <div
          ref={postBodyRef}
          className="
            prose
            prose-lg
            max-w-none
            prose-headings:text-teal-800
            prose-headings:font-bold
            prose-p:text-teal-700
            prose-p:leading-relaxed
            prose-p:mb-3
            prose-a:text-blue-600
            prose-strong:text-teal-800
            prose-strong:font-bold
            prose-img:rounded-xl
            prose-ul:text-teal-700
            prose-ol:text-teal-700
            prose-li:text-teal-700
            prose-blockquote:border-l-4
            prose-blockquote:border-teal-200
            prose-blockquote:bg-teal-50/50
            prose-blockquote:px-4
            prose-blockquote:py-2
            prose-blockquote:rounded-md
            prose-blockquote:not-italic
            [&_h2]:text-[22px]
            [&_h2]:md:text-2xl
            [&_h2]:font-bold
            [&_h2]:text-teal-800
            [&_h2]:mt-6
            [&_h2]:mb-3
            [&_h2]:leading-relaxed
            [&_h3]:text-[19px]
            [&_h3]:md:text-xl
            [&_h3]:font-semibold
            [&_h3]:text-teal-800
            [&_h3]:mt-5
            [&_h3]:mb-2
            [&_h3]:leading-relaxed
          "
        >
          {/* <ReactMarkdown>{post.content || post.excerpt}</ReactMarkdown> */}

          {/* Temporary fallback */}
          <p>{post.content || post.excerpt}</p>
        </div>
      </article>

      {/* Suggested Posts */}
      {suggestedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20 mt-16 border-t border-slate-200">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-10">
            আরও পড়ুন
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {suggestedPosts.map((p) => (
              <Link
                key={p.id}
                to={`/post/${p.id}`}
                className="group block"
              >
                <article
                  className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    p-6
                    h-full
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >
                  <h3
                    className="
                      text-lg
                      font-bold
                      text-teal-800
                      mb-3
                      line-clamp-2
                      group-hover:text-teal-600
                      transition-colors
                    "
                  >
                    {p.title}
                  </h3>

                  <p
                    className="
                      text-teal-600
                      text-sm
                      leading-7
                      line-clamp-6
                    "
                  >
                    {p.excerpt || "বিস্তারিত পড়তে ক্লিক করুন..."}
                  </p>

                  <div className="mt-5 inline-flex items-center font-medium text-teal-600">
                    আরও পড়ুন →
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}