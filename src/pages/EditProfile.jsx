import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    profilePicture: '',
  });

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        setPreview(`http://localhost:5000${res.data.profilePicture}`);

      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser((prev) => ({ ...prev, profilePicture: file }));

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('bio', user.bio);
    if (user.profilePicture instanceof File) {
      formData.append('profilePicture', user.profilePicture);
    }

    try {
      await axios.put('http://localhost:5000/api/user/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated!');
      navigate('/profile'); 
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Update failed.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          {preview ? (
            <img src={preview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-300" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

       <button type="submit" className="px-4 py-2 w-full bg-[rgb(56,56,56)] text-white  ">
          Save
        </button>
        
      </form>
    </div>
  );
};

export default EditProfile;
