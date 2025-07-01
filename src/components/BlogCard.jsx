import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ title, excerpt, headerImage, publishDate, slug }) {
    return (
        <div className="bg-white shadow-md overflow-hidden h-[550px] w-96 flex flex-col ">
            {/* Image with link to blog post */}
            <Link to={`/blog/${slug}`}>
                <img
                    src={`http://localhost:5000${headerImage}`}  // Backend image URL
                    alt={title}                                  // Alt text for accessibility
                    className="w-full h-72 object-cover"        // Styling the image
                />
            </Link>

            {/* Content area */}
            <div className="p-4 flex flex-col flex-grow ">
                {/* Blog title with link */}
                <Link to={`/blog/${slug}`}>
                    <h3 className="text-lg tracking-widest font-normal mb-2 uppercase h-14 overflow-hidden text-ellipsis">
                        {title}
                    </h3>
                </Link>

                {/* Publish date formatted as local date */}
                <p className="text-xs text-gray-500 mb-2">
                    {new Date(publishDate).toLocaleDateString()}
                </p>

                {/* Blog excerpt with link */}
                <Link to={`/blog/${slug}`}>
                    <p className="text-sm text-black mb-4 overflow-hidden flex-grow">
                        {excerpt}
                    </p>
                </Link>

                {/* Read More link with underline animation */}
                <div className="mt-auto">
                    <Link
                        to={`/blog/${slug}`}
                        className="relative inline-block text-black text-sm font-medium after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
}
