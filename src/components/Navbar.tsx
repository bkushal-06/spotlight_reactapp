import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, User as UserIcon, Home, Settings } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="bg-primary-dark text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-bold text-xl">spotlight</Link>
          
          {isAuthenticated && (
            <>
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/" className="hover:text-primary-light flex items-center gap-2">
                  <Home size={20} />
                  <span>Home</span>
                </Link>
                <Link to="/dashboard" className="hover:text-primary-light flex items-center gap-2">
                  <Settings size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="hover:text-primary-light flex items-center gap-2">
                  <UserIcon size={20} />
                  <span>Profile</span>
                </Link>
                <ThemeToggle />
                <button
                  onClick={logout}
                  className="hover:text-primary-light flex items-center gap-2"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
              <MobileMenu />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};