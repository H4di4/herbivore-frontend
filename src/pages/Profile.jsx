import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Profile error:', err);
        setUser(null);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Orders error:', err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchOrders();
  }, [token]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (!user) return <div className="text-center text-red-500 mt-8">Unable to load profile</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 mt-12">
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-3xl font-semibold">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-gray-700">{user.email}</p>
        <Link
          to="/edit-profile"
          className="inline-block mt-3 px-4 py-2 border border-gray-400 text-sm hover:bg-[rgb(56,56,56)] hover:text-white "
        >
          EDIT PROFILE
        </Link>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Orders Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-center md:text-left">My Orders</h3>

        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-sm text-left border">
              <thead className="bg-gray-100 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 border">Order ID</th>
                  <th className="px-4 py-3 border">Status</th>
                  <th className="px-4 py-3 border">Total</th>
                  <th className="px-4 py-3 border">Date</th>
                  <th className="px-4 py-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td className="px-4 py-3 border">{order._id}</td>
                    <td className="px-4 py-3 border capitalize">{order.status}</td>
                    <td className="px-4 py-3 border">${order.totalAmount?.toFixed(2)}</td>
                    <td className="px-4 py-3 border">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border">
                      <Link
                        to={`/orders/${order._id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className='mt-2 text-center'>


              <p className="text-center text-gray-600">You have no orders yet.</p>
              <Link
                to="/skincare"
                className="mt-4 inline-block px-6 py-2  bg-[rgb(56,56,56)] text-white  "
              >
                SHOP NOW
              </Link>
            </div>
          </>

        )}
      </div>
    </div>
  );
};

export default Profile;
