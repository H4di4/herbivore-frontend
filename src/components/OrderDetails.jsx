import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token]);

  if (loading) return <div className="text-center mt-8">Loading order details...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;
  if (!order) return <div className="text-center mt-8">Order not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 mt-12">
      <h2 className="text-center text-2xl font-normal uppercase mb-6">Order Details</h2>

      <table className="min-w-full border text-left text-sm">
        <thead className="bg-gray-100 uppercase text-xs">
          <tr>
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Ordered By</th>
            <th className="px-4 py-2 border">Order Date</th>
            <th className="px-4 py-2 border">Total Amount</th>
            <th className="px-4 py-2 border">Product</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(({ productId, title, price, quantity, imageUrl }, index) => (
            <tr key={productId} className="border-t ">
              {/* Show order details only on first row, otherwise blank */}
              {index === 0 ? (
                <>
                  <td className="px-4 py-2 border" rowSpan={order.items.length}>{order._id}</td>
                  <td className="px-4 py-2 border capitalize" rowSpan={order.items.length}>{order.status}</td>
                  <td className="px-4 py-2 border" rowSpan={order.items.length}>
                    {order.user.firstName}{order.user.lastName} 
                  </td>
                  <td className="px-4 py-2 border" rowSpan={order.items.length}>
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border font-semibold" rowSpan={order.items.length}>
                    ${order.totalAmount.toFixed(2)}
                  </td>
                </>
              ) : null}

              {/* Item details */}
              <td className="px-4 py-2 border flex items-center gap-3">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                {title}
              </td>
              <td className="px-4 py-2 border">${price.toFixed(2)}</td>
              <td className="px-4 py-2 border">{quantity}</td>
              <td className="px-4 py-2 border">${(price * quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        to="/profile"
        className="inline-block mt-6 px-4 py-2 bg-[rgb(56,56,56)] text-white right-1"
      >
        Back to Profile
      </Link>
    </div>
  );
};

export default OrderDetails;
