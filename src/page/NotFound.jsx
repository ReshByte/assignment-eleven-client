import React from 'react';

import { Link } from 'react-router'; 
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-6">
     
        <title>LocalChefBazaar | 404 Not Found</title>
     

     
      <img
        src="https://images.pexels.com/photos/27968632/pexels-photo-27968632.jpeg" // অথবা অন্য কোনো 404 image URL
        alt="Page Not Found - Lost Toy"
        className="w-80 h-80 object-cover rounded-full shadow-lg mb-8 animate-pulse-slow" // animate-pulse-slow এর জন্য Tailwind config এ যোগ করতে হতে পারে
      />

      <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl md:text-3xl font-semibold text-base-content mb-6">
        Oops! The Page is Not Found.
      </p>
      <p className="text-lg text-gray-500 mb-8 max-w-md">
        We can't find the page you requested. Maybe it moved, or you typed the wrong address?
      </p>

      {/* Home পেজে ফিরে যাওয়ার বাটন */}
      <Link to="/" className="btn btn-primary btn-lg px-8 shadow-md hover:scale-105 transition-transform duration-300">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;