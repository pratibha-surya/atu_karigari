import React, { useState } from 'react';
import { CiMenuFries } from "react-icons/ci";
import { FaUser, FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Pages/context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logoutUser } = useAuth(); // ✅ FIXED HERE

  const navLinks = [
    { label: 'HANDLOOM', href: '/' },
    { label: 'HANDICRAFT', href: '/' },
    { label: 'SHOP BY OCCASION', href: '/' },
    { label: 'CRAFT STORIES', href: '/' },
    { label: 'ABOUT US', href: '/' },
  ];

  return (
    <>
      <h3 className="w-full text-white text-center text-sm font-semibold hidden sm:block"
        style={{
          height: '31px',
          backgroundColor: '#6D001D',
          border: '1px solid #8E8E8E1A',
        }}>
        Step into Style and Discover your Signature Look
      </h3>

      <nav className="bg-white shadow-md py-4 px-4 sm:px-6 md:px-8 flex justify-between items-center relative font-sans flex-wrap">
        <div className="flex flex-col sm:flex-row sm:items-center text-lg sm:text-2xl font-semibold text-[#7F0A18] leading-5 sm:leading-none">
          <span>Atulya</span>
          <span className="sm:ml-1 border border-yellow-400 bg-yellow-400 text-[#7F0A18] px-2 py-1 rounded">
            Karigari
          </span>
        </div>

        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.href} className="relative hover:text-orange-600 transition-colors duration-200">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full py-1.5 px-4 pl-10 text-sm bg-[#F09D8D] focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none" />
          </div>

          {/* ✅ LOGIN / LOGOUT BUTTON */}
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-1.5 border border-orange-600 text-orange-600 rounded hover:bg-orange-600 hover:text-white transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logoutUser}
              className="px-4 py-1.5 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
            >
              Logout
            </button>
          )}

          <FaUser className="text-gray-600 hover:text-orange-600 cursor-pointer" size={18} />
          <FaHeart className="text-gray-600 hover:text-orange-600 cursor-pointer" size={18} />
          <FaShoppingCart className="text-gray-600 hover:text-orange-600 cursor-pointer" size={18} />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOBOT-Mbazf_ImuPVvxar-BBPsu_GMtvX5dg&s"
            alt="shopping bag"
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          <CiMenuFries size={25} />
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-10">
            <ul className="flex flex-col text-center space-y-3 py-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="block px-4 py-2 hover:bg-orange-100 text-[#7F0A18] font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                {!user ? (
                  <Link
                    to="/login"
                    className="inline-block px-4 py-2 border border-orange-600 text-orange-600 rounded hover:bg-orange-600 hover:text-white transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      logoutUser(); // ✅ FIXED
                      setMenuOpen(false);
                    }}
                    className="inline-block px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
