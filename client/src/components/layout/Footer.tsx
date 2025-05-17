import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 py-6 border-t border-[#1E1E1E] bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center mr-2">
                <i className="ri-dna-fill text-white"></i>
              </div>
              <span className="font-gaming font-bold">PLAYER DNA</span>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Unlock your gaming identity
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary-300 transition">
              <i className="ri-twitter-fill text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-300 transition">
              <i className="ri-discord-fill text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-300 transition">
              <i className="ri-youtube-fill text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-300 transition">
              <i className="ri-steam-fill text-xl"></i>
            </a>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="py-2 px-3 bg-[#1E1E1E] rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="bg-primary-600 hover:bg-primary-700 transition duration-300 text-white py-2 px-4 rounded-r-lg text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1E1E1E] flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Player DNA. All rights reserved.
          </div>

          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary-300 transition text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-300 transition text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-300 transition text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
