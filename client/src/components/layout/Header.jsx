import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/UseCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

const Header = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const categories = useCategory();

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    setIsProfileDropdownOpen(false); // Close profile dropdown
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsCategoryDropdownOpen(false); // Close category dropdown
  };

  return (
    <>
      <nav className="bg-blue-500 border-b border-blue-600 h-18">
        <div className="container mx-auto flex justify-between items-center h-full px-4 py-2">
          <NavLink to="/" className="text-3xl font-semibold text-white">
            UrbanVista
          </NavLink>

          <div className="w-1/3">
            <SearchInput />
          </div>

          <ul className="flex space-x-4 items-center mt-2">
            <li>
              <NavLink
                to="/"
                className="text-white hover:bg-blue-600 py-2 px-3 rounded-md text-lg font-medium"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li className="relative">
              <button
                onClick={toggleCategoryDropdown}
                className="text-white hover:bg-blue-600 py-2 px-3 rounded-md text-lg font-medium"
              >
                Categories <span>&#9662;</span>
              </button>
              {isCategoryDropdownOpen && (
                <ul className="absolute right-0 mt-2 bg-white border border-blue-600 rounded-lg w-40 shadow-lg">
                  <li>
                    <NavLink
                      to="/categories"
                      className="block py-2 px-4 text-blue-600 hover:bg-blue-100 text-lg font-medium"
                    >
                      All Categories
                    </NavLink>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.slug}>
                      <NavLink
                        to={`/category/${c.slug}`}
                        className="block py-2 px-4 text-blue-600 hover:bg-blue-100 text-lg font-medium"
                      >
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {!auth.user ? (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className="text-white hover:bg-blue-600 py-2 px-3 rounded-md text-lg font-medium"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="text-white hover:bg-blue-600 py-2 px-3 rounded-md text-lg font-medium"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="text-white hover:bg-blue-600 py-2 px-3 rounded-md text-lg font-medium relative z-10"
                  >
                    {auth.user.name} <span>&#9662;</span>
                  </button>
                  {isProfileDropdownOpen && (
                    <ul className="absolute right-0 mt-2 bg-white border border-blue-600 rounded-lg w-40 shadow-lg z-20">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="block py-2 px-4 text-blue-600 hover:bg-blue-100 text-lg font-medium"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            handleLogOut();
                          }}
                          className="block py-2 px-4 text-blue-600 hover:bg-blue-100 text-lg font-medium"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}
            <li>
              <Badge count={cart?.length} showZero>
                <NavLink
                  to="/cart"
                  className="text-white hover:bg-blue-600 py-2 px-3 rounded-md text-lg font-medium"
                >
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
