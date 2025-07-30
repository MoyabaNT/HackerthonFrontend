import React from 'react'

const Footer = () => {
  return (
    <div>
            <footer id="contact" className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Farfare</h3>
            <p className="text-gray-400">Farfare is revolutionizing South Africa's taxi industry by automating passenger documentation with secure cloud solutions.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">Email: support@farfare.co.za</p>
            <p className="text-gray-400">Phone: +27 123 456 789</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          © 2025 Farfare. All rights reserved.
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer