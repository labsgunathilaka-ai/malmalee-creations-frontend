import React from 'react';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#ffaed7] text-gray-900 pt-12 pb-6 px-6 md:px-16 font-sans mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
        
        {/* Brand Column */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold tracking-widest uppercase mb-3">
            Malmalee Creations
          </h2>
          <p className="text-sm text-pink-900 leading-relaxed">
            Your destination for handcrafted, unique creations. Made in Sri Lanka.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-pink-950">
            Shop
          </h3>
          <ul className="space-y-2 text-sm text-pink-900">
            <li><a href="#scrunchies" className="hover:text-white transition">Scrunchies</a></li>
            <li><a href="#hairbows" className="hover:text-white transition">Hair Bows</a></li>
            <li><a href="#giftsets" className="hover:text-white transition">Gift Sets</a></li>
            <li><a href="#all" className="hover:text-white transition">All Products</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-pink-950">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-pink-900">
            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
            <li><a href="#careers" className="hover:text-white transition">Careers</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Customer Support Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-pink-950">
            Customer Support
          </h3>
          <ul className="space-y-2 text-sm text-pink-900">
            <li><a href="#faqs" className="hover:text-white transition">FAQs</a></li>
            <li><a href="#shipping" className="hover:text-white transition">Shipping Info</a></li>
            <li><a href="#returns" className="hover:text-white transition">Return Policy</a></li>
            <li><a href="#tracking" className="hover:text-white transition">Order Tracking</a></li>
          </ul>
        </div>

        {/* Newsletter & Social Icons */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 text-pink-950">
            Join Our Newsletter
          </h3>
          <p className="text-xs text-pink-900 mb-3">
            Sign up for 10% off your next order!
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 mb-6">
            <input
              type="email"
              placeholder="Your email address..."
              className="px-3 py-2 text-sm rounded bg-white text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#ff0081] text-white font-bold text-xs py-2 uppercase tracking-wider rounded hover:bg-darkPurple transition"
            >
              Subscribe
            </button>
          </form>

          {/* Social Icons */}
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-pink-950">
            Follow Us
          </h3>
          <div className="flex gap-4 text-lg">
            <a href="#instagram" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#facebook" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#tiktok" className="hover:text-white transition"><FaTiktok /></a>
          </div>
        </div>

      </div>

      {/* Copyright Notice */}
      <div className="border-t border-pink-300 pt-4 text-center text-xs text-pink-900">
        © {new Date().getFullYear()} Malmalee Creations. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;