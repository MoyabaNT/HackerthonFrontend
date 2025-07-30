import React from 'react'
import NavBar from '../Sections/NavBar'
import Footer from '../Sections/Footer'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <NavBar />

         <section id="home" className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Farfare</h1>
        <p className="text-lg md:text-xl mb-6">Automating passenger documentation for South Africa's taxi industry. Say goodbye to paper trails with secure, cloud-based solutions.</p>
        <Link to='/LogIn'><button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">Get Started</button></Link>
      </div>
    </section>

        <section id="features" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Farfare?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-blue-600 text-4xl mb-4">☁️</div>
            <h3 className="text-xl font-semibold mb-2">Cloud Storage</h3>
            <p className="text-gray-600">Securely store passenger details in the cloud, accessible anytime, anywhere.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-blue-600 text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Easy Automation</h3>
            <p className="text-gray-600">Streamline manual processes with our intuitive app, saving time and effort.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-blue-600 text-4xl mb-4">🗑️</div>
            <h3 className="text-xl font-semibold mb-2">No Paper Trails</h3>
            <p className="text-gray-600">Eliminate paperwork with digital records, reducing clutter and errors.</p>
          </div>
        </div>
      </div>
    </section>

        <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Taxi Operations?</h2>
        <p className="text-lg mb-6">Join Farfare today and experience the future of passenger management.</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">Start Now</button>
      </div>
    </section>
    <Footer />
    </div>
  )
}

export default Home