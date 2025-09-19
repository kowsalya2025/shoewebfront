import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);  // ✅ include setter

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.length); // ✅ now works
  };

  return (
    <header className="shadow text-2xl" style={{ backgroundColor: "#0f766e", color: "white" }}>
      {/* Top Navbar */}
      <div className="bg-teal-900 text-white flex justify-between items-center px-6 py-3">
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src="/logo.jpg" alt="StepUp Logo" className="h-20 w-20 rounded-full object-cover" style={{ width:"120px", height:"110px"}}/>
          </Link>

          {/* Search bar */}
          <div className="relative w-80 ml-20">
            {/* Search Icon */}
            <svg
              className="absolute left-4 top-1 -translate-y-1/4 text-gray-400"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="text"
              placeholder="Search here"
              className="pl-12 pr-4 py-2 w-full rounded-full border border-gray-300 bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>
        </div>

        {/* Right: Links */}
         <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            
            className={({ isActive }) =>
              `text-white hover:text-red-400 ${isActive ? "text-red-400 font-semibold" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink to="/about"  className={({ isActive }) =>
              `text-white hover:text-red-400 ${isActive ? "text-red-400 font-semibold" : ""}`
            }>About Us</NavLink>
          <NavLink to="/contact"  className={({ isActive }) =>
              `text-white hover:text-red-400 ${isActive ? "text-red-400 font-semibold" : ""}`
            }>Contact Us</NavLink>
          <NavLink to="/login"  className={({ isActive }) =>
              `text-white hover:text-red-400 ${isActive ? "text-red-400 font-semibold" : ""}`
            }>Log in</NavLink> 

              {/* <NavLink to="/cart" className="relative flex items-center text-white">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
            <span className="ml-1">Cart</span>
          </NavLink>  */}
        </nav>
      </div>

      {/* Middle Title */}
  <div className="bg-white text-center py-4 text-black">
  <h1 className="text-3xl font-bold tracking-wide">StepUp.in</h1>
</div>

            <hr />
      {/* Category Menu */}
      <div className="bg-white border-y flex justify-center gap-10 py-3 text-2xl font-semibold">
        <NavLink to="/womens">Womens</NavLink>
        <NavLink to="/mens">Mens</NavLink>
        <NavLink to="/kids">Kids</NavLink>
        <NavLink to="/brands">Brands</NavLink>
        <NavLink to="/offers">Offers</NavLink>
      </div>
    </header>
  );
}

