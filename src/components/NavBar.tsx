import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Order App</div>
        <div className="relative" ref={menuRef}>
          <button 
            onClick={toggleMenu} 
            className="text-white font-bold focus:outline-none px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Menu
          </button>
          {isMenuOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 border border-gray-300">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? 'block px-4 py-2 text-gray-800 bg-blue-500 font-bold rounded-t-lg' : 'block px-4 py-2 text-gray-800 hover:bg-gray-200 font-bold rounded-t-lg'
                  }
                  end
                  onClick={toggleMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/new" 
                  className={({ isActive }) => 
                    isActive ? 'block px-4 py-2 text-gray-800 bg-blue-500 font-bold rounded-b-lg' : 'block px-4 py-2 text-gray-800 hover:bg-gray-200 font-bold rounded-b-lg'
                  }
                  onClick={toggleMenu}
                >
                  New Item
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
