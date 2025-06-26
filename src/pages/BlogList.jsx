import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/blogs")
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch blogs", err);
                setLoading(false);
            });
    }, []);



    return (

        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-center text-3xl font-normal text-black mt-6 mb-14">NATURALLY SPEAKING</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        title={blog.title}
                        excerpt={blog.excerpt}
                        headerImage={blog.headerImage}
                        publishDate={blog.publishedAt}
                        slug={blog.slug}
                    />
                ))}
            </div>

        </div>

    );
}
