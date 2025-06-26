import React from 'react';

export default function CartDrawer({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay with blur and dark background */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
      />

      {/* Drawer sliding in from left */}
      <div className="fixed top-0 right-0 h-full w-2/6 bg-white shadow-lg z-50 p-6 overflow-auto">

        <button
          onClick={onClose}
          className="text-gray-800 hover:text-gray-900 text-3xl mb-6"
          aria-label="Close Cart"
        >
          ×
        </button>
        <div className="flex flex-col flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
