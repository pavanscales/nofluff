import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-gray-900";

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 relative h-20">
        {/* Logo or Brand - you can add here */}

        {/* Hamburger button - only on mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              // X icon when open
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon when closed
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile nav - show only if toggled open */}
        {mobileMenuOpen && (
          <nav className="flex flex-col absolute top-20 left-0 w-full bg-white border-t border-gray-200 md:hidden px-6 py-4 space-y-4 shadow-lg z-10">
            <Link
              to="/"
              className={isActive("/")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/problems"
              className={isActive("/problems")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Problems
            </Link>
            <Link
              to="/blog"
              className={isActive("/blog")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/forums"
              className={isActive("/forums")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Forums
            </Link>
            <Link
              to="/submit"
              className={isActive("/submit")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Submit
            </Link>
          </nav>
        )}

        {/* Desktop nav - shows on md and up */}
        <nav className="hidden md:flex space-x-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/problems" className={isActive("/problems")}>
            Problems
          </Link>
          <Link to="/blog" className={isActive("/blog")}>
            Blog
          </Link>
          <Link to="/forums" className={isActive("/forums")}>
            Forums
          </Link>
          <Link to="/submit" className={isActive("/submit")}>
            Submit
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
