// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="text-black py-10 px-6 md:px-20" style={{ backgroundColor: "#0f766e", color: "white" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-lg">
        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="mb-2">We’d love to hear from you!</p>
          <p className="mb-1">Landline : XXXXXXXXXX</p>
          <p className="mb-1">WhatsApp : +91XXXXXXXXXX</p>
          <p className="mb-1">Email : stepup@gmail.com</p>
          <p className="mb-1">
            Address : 2/38, yyyyyyyyyyy <br />
            Tenkasi, Tamilnadu, India.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-1">
            <li><a href="/womens" className="text-white hover:underline">New in</a></li>
            <li><a href="/womens" className="text-white hover:underline">Women</a></li>
            <li><a href="/mens" className="text-white hover:underline">Men</a></li>
            <li><a href="/kids" className="text-white hover:underline">Accessories</a></li>
            <li><a href="/womens" className="text-white hover:underline">Heels</a></li>
            <li><a href="/about" className="text-white hover:underline">About us</a></li>
          </ul>
        </div>

        {/* Info Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Info</h3>
          <ul className="space-y-1 text-white">
            <li><a href="#" className="text-white hover:underline">Search</a></li>
            <li><a href="#" className="text-white hover:underline">Return & Exchange Policy</a></li>
            <li><a href="#" className="text-white hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="text-white hover:underline">Terms of Service</a></li>
            <li><a href="#" className="text-white hover:underline">Shipping Policy</a></li>
            <li><a href="#" className="text-white hover:underline">Blogs</a></li>
          </ul>
        </div>

        {/* Social Media */}
<div>
  <h3 className="text-lg font-semibold mb-3">Social Media</h3>
  <div className="flex gap-5 text-3xl bg-teal">
    <a href="#">
      <i className="fab fa-facebook-f text-blue-600 hover:text-blue-400 bg-white p-2"></i>
    </a>
    <a href="#">
      <i className="fab fa-instagram text-pink-600 hover:text-pink-400 bg-white p-2"></i>
    </a>
    <a href="#">
      <i className="fab fa-twitter text-sky-600 hover:text-sky-400 bg-white p-2"></i>
    </a>
    <a href="#">
      <i className="fab fa-facebook-messenger text-blue-500 hover:text-blue-300 bg-white p-2"></i>
    </a>
  </div>
</div>


        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Lets stay in touch!</h3>
          <p className="text-sm mb-4">
            Sign up for exclusive offers, original stories, events and more.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed successfully!");
            }}
            className="flex flex-col space-y-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="p-2 rounded text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-500 text-center mt-10 pt-4 text-sm">
        © {new Date().getFullYear()} StepUp.in | All rights reserved.
      </div>
    </footer>
  );
}
