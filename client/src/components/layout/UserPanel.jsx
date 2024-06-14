import React from 'react';
import { NavLink } from 'react-router-dom';

const UserPanel = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-white h-screen">
        <div className="p-4">
          <h1 className="text-gray-800 text-lg font-bold mb-4">User Panel</h1>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard/user/profile"
                className="text-gray-800 hover:text-gray-900 hover:bg-gray-300 block px-4 py-2 rounded"
                activeClassName="bg-gray-300"
              >
                Profile
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to="/dashboard/user/orders"
                className="text-gray-800 hover:text-gray-900 hover:bg-gray-300 block px-4 py-2 rounded"
                activeClassName="bg-gray-300"
              >
                Orders
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

export default UserPanel;
