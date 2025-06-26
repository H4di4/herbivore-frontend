import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (!user) return <div className="text-center text-red-500 mt-8">Unable to load profile</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 mt-12">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          {user.profilePicture ? (
            <img
              src={`http://localhost:5000${user.profilePicture}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-white">
              No Image
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-semibold mb-1">
            {user.firstName ?? 'User'} {user.lastName ?? ''}
          </h1>

          <div className="flex justify-center md:justify-start gap-6 text-sm text-gray-700 mb-3">
            <span><strong>{user.savedPosts?.length || 0}</strong> posts</span>
            <span><strong>0</strong> followers</span>
            <span><strong>0</strong> following</span>
          </div>

          <p className="text-sm mb-1">{user.bio || 'No bio yet'}</p>
        

          {/* Full-width Edit Button */}
          <div className="mt-4">
            <Link
              to="/edit-profile"
              className="block w-full md:w-auto text-center px-4 py-2 border border-gray-400 text-sm  hover:bg-[rgb(56,56,56)] hover:text-white"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-gray-300" />

      {/* Saved Posts Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Saved Posts</h3>
        {user.savedPosts?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {user.savedPosts.map(post => (
              <div
                key={post._id}
                className="bg-gray-100 h-40 flex items-center justify-center text-sm text-gray-700"
              >
                {post.title}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No saved posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
