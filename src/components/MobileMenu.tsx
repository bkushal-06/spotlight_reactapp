import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Settings, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { ThemeToggle } from './ThemeToggle';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-primary-dark p-4 shadow-lg z-50">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-primary-light"
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-white hover:text-primary-light"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-white hover:text-primary-light"
              onClick={() => setIsOpen(false)}
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 text-white hover:text-primary-light"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};