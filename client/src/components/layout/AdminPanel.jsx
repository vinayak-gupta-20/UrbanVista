import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-slate-200 h-screen">
        <div className="p-4">
          <h1 className="text-gray-800 text-lg font-bold mb-4">Admin Panel</h1>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard/admin/users"
                className="text-gray-800 hover:text-gray-900 hover:bg-gray-300 block px-4 py-2 rounded"
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/create-product"
                className="text-gray-800 hover:text-gray-900 hover:bg-gray-300 block px-4 py-2 rounded"
              >
                Create Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/create-category"
                className="text-gray-800 hover:text-gray-900 hover:bg-gray-300 block px-4 py-2 rounded"
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/orders"
                className="text-gray-800 hover:text-gray-900 hover:bg-gray-300 block px-4 py-2 rounded"
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/products"
                className="text-gray-800 hover:text-gray-900 hover:bg-gray-300 block px-4 py-2 rounded"
              >
                Products
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-grow p-8">
        {/* Main content of the admin panel */}
        {/* You can render your main content here */}
      </div>
    </div>
  );
};

export default AdminPanel;
