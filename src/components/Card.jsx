import React from 'react'
import { Link,  } from "react-router-dom";

const Card = ({post,getReadingTime}) => {
   
  return (
    <>
 <article
    key={post.id}
    className="bg-gray-50 rounded-2xl  overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-300 flex flex-col"
  >
    {post.thumbnail && (
      <Link
        to={`/post/${post.id}`}
        className="block overflow-hidden"
      >
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>
    )}

    <div className="p-6 flex flex-col flex-1">
      {/* Category */}
      <div className="mb-3">
        <Link
          to={`/?c=${post.category}`}
          className="inline-flex px-3 py-1 text-xs font-medium border border-teal-700 rounded-full bg-gray-50 text-teal-700 hover:bg-teal-700 hover:text-white transition"
        >
          {post.category}
        </Link>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-teal-700 mb-3 line-clamp-2">
        <Link
          to={`/post/${post.id}`}
          className="hover:text-teal-900 transition-colors"
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt */}
      <p className="text-gray-600 leading-relaxed line-clamp-3 flex-1">
        {post.excerpt}
      </p>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((t) => (
            <Link
              key={t}
              to={`/?t=${t}`}
              className="px-2 py-1 text-xs rounded-md bg- text-gray-600 hover:bg-gray-100 transition"
            >
              #{t}
            </Link>
          ))}
        </div>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 font-medium mt-5 pt-4 border-t border-gray-100">
        <span>{post.date}</span>
        <span>•</span>
        <span>{getReadingTime(post.content)} মিনিট</span>
      </div>

      {/* Button */}
      <Link
        to={`/post/${post.id}`}
        className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-lg border  text-teal-800 font-medium hover:bg-teal-700 hover:text-white transition-all duration-300"
      >
        আরো পড়ুন →
      </Link>
    </div>
  </article>
    </>
  )
}

export default Card
