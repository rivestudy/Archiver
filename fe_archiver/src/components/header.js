import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.png";
import pp from "../images/pp.jpg";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const username = localStorage.getItem('username') || 'username';
  const role = localStorage.getItem('role');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-[#4d5d53] h-[7vh] px-[10vw] justify-between flex items-center">
      <div className="flex items-center">
        <img src={logo} className="size-[4vh] mr-3" alt="logo" />
        <h3 className="text-3xl font-medium text-[#d0f0bf]">ARCHIVER</h3>
      </div>

      <div className="relative flex items-center">
        <h1 className='mr-4 font-semibold text-white'> Hello, {username}</h1>
        <img src={pp} className="size-[4vh] mr-2 rounded-full mt-1" alt="pp" />

        <button
          className="text-white size-[5vh] rounded-full p-2"
          onClick={toggleDropdown}
        >
          <GiHamburgerMenu />
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 w-48 mt-2 bg-white rounded-md shadow-lg right-10 top-10">
            <ul className="p-2 list-none">
              <Link to="/home">
                <button className="w-full p-3 cursor-pointer hover:bg-gray-200">
                  Home
                </button>
              </Link>
              <Link to="/input">
                <button className="w-full p-3 cursor-pointer hover:bg-gray-200">
                  Input
                </button>
              </Link>
              <Link to="/view">
                <button className="w-full p-3 cursor-pointer hover:bg-gray-200">
                  View
                </button>
              </Link>
              
              {/* Conditional rendering for admin routes */}
              {role === 'admin' && (
                <>
                  <Link to="/admin">
                    <button className="w-full p-3 cursor-pointer hover:bg-gray-200">
                      Admin
                    </button>
                  </Link>
                  <Link to="/history">
                    <button className="w-full p-3 cursor-pointer hover:bg-gray-200">
                      History
                    </button>
                  </Link>
                  <Link to="/review">
                    <button className="w-full p-3 cursor-pointer hover:bg-gray-200">
                      Review
                    </button>
                  </Link>
                </>
              )}
              
              <Link to="/">
                <button className="w-full p-3 cursor-pointer hover:bg-gray-200">
                  Logout
                </button>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;