import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"


export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/admin/blogs/${slug}`)
      .then(res => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found</p>;

  return (
    <>
     <div className="max-w-5xl mx-auto px-4 py-8">
       
      <p className="text-sm text-gray-500 mb-6">
        {new Date(blog.publishedAt).toLocaleDateString()}
      </p>
       <h1 className="text-3xl tracking-wide uppercase font-normal mb-4">{blog.title}</h1>
      <img src={`http://localhost:5000${blog.headerImage}`} alt={blog.title} className="w-96 h-90 object-cover mx-auto mt-10 mb-6" />
      
   
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
     
    </div>
    <Newsletter/>
    <Footer />
    </>
   
    
  );
}
