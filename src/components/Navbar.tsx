import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-gray-900";

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 relative h-20">
        
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
