// Banner.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Banner() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then(res => setBanner(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!banner) return <p>Loading banner...</p>;

  return (
    <section
      className="relative p-10 md:p-20 text-white flex flex-col justify-center min-h-[500px]"
      style={{
        backgroundImage: `url(${banner.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-xl text-left">
        <h2 className="text-black font-normal text-sm uppercase mb-4">{banner.subtitle}</h2>
        <h1 className="text-4xl text-wrap text-black mb-6">{banner.title}</h1>
        <p className="mb-6 text-black">{banner.description}</p>
        <Link to='/skincare'>
        <button className="mt-3 bg-transparent border border-black px-6 py-3 text-black transition font-normal">
          SHOP NOW
        </button>
        </Link>
      </div>
    </section>
  );
}
