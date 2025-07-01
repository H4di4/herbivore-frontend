// Banner.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Banner() {
  // State to hold banner data fetched from the backend
  const [banner, setBanner] = useState(null);
  // State to track if an error occurred during fetching
  const [error, setError] = useState(null);

  // useEffect hook to fetch banner data once when component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then(res => {
        // Save the banner data from response
        setBanner(res.data);
        // Clear any previous error
        setError(null);
      })
      .catch(err => {
        // Log error to console and update error state
        console.error(err);
        setError('Failed to load banner data.');
      });
  }, []); // Empty dependency array means this runs once on mount

  // Show loading state while banner data is being fetched
  if (!banner && !error) {
    return (
      <section className="h-[500px] flex items-center justify-center bg-gray-100">
        <div className="animate-pulse text-gray-500">Loading banner...</div>
      </section>
    );
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <section className="h-[500px] flex items-center justify-center bg-red-100">
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  // Render the banner section with background image and text
  return (
    <section
      className="relative p-10 md:p-20 text-white flex flex-col justify-center min-h-[500px]"
      style={{
        backgroundImage: `url(${banner.image})`, // Background image from fetched data
        backgroundSize: 'cover',                // Make image cover entire section
        backgroundPosition: 'center',           // Center image in section
        backgroundRepeat: 'no-repeat',          // Prevent image repeating
      }}
    >
      <div className="max-w-xl text-left">
        {/* Subtitle displayed in small uppercase font */}
        <h2 className="text-black font-normal text-sm uppercase mb-4">{banner.subtitle}</h2>
        {/* Title displayed prominently */}
        <h1 className="text-4xl text-wrap text-black mb-6">{banner.title}</h1>
        {/* Description paragraph */}
        <p className="mb-6 text-black">{banner.description}</p>
        {/* Link wrapping a button that routes to /skincare */}
        <Link to='/skincare'>
          <button className="mt-3 bg-transparent border border-black px-6 py-3 text-black transition font-normal">
            SHOP NOW
          </button>
        </Link>
      </div>
    </section>
  );
}
