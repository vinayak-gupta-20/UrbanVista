import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const Pagenotfound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Oops! Page Not Found</h2>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
