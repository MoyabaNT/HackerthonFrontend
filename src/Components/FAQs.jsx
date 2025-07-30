import React, { useContext, useState } from 'react';
import HomeNav from './HomeNav';
import { ThemeContext } from './Themes/ThemeContext';

const FAQs = () => {
  const { theme } = useContext(ThemeContext);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I add a new passenger?",
      answer: "Navigate to the Passengers page from the sidebar menu. Click the 'Add New Passenger' button, fill in the name, contact number, and pickup location in the form, and submit. The passenger will appear in the list.",
    },
    {
      question: "How can I dispatch a taxi?",
      answer: "Go to the Marshall Dashboard and click the 'Dispatch Taxi' button in the Taxis Dispatched card. This increments the taxi dispatch count. Contact your administrator for details on actual taxi assignments.",
    },
    {
      question: "Where can I view the passenger list?",
      answer: "The full passenger list is available on the Passengers page, accessible via the sidebar menu. Each passenger’s details, including name, contact, and pickup location, are displayed in cards.",
    },
    {
      question: "How do I log out of Farfare?",
      answer: "Click the 'Logout' link in the sidebar menu. This will redirect you to the login page, ending your current session.",
    },
    {
      question: "Can I edit or delete a passenger?",
      answer: "Currently, editing or deleting passengers is not supported in the interface. Contact your administrator to modify passenger records in the backend system.",
    },
    {
      question: "What should I do if I encounter an error?",
      answer: "Check your internet connection and refresh the page. If the issue persists, contact Farfare support at support@farfare.com or call +27 123 456 789 for assistance.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`flex min-h-screen ${theme === 'light' ? 'bg-gradient-to-b from-gray-50 to-gray-100' : 'bg-gradient-to-b from-gray-800 to-gray-900'}`}>
      <HomeNav />
      <div className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mt-6">
        <h1 className={`text-2xl sm:text-3xl font-extrabold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-6 tracking-tight`}>
          Frequently Asked Questions
        </h1>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md overflow-hidden`}
            >
              <button
                className={`w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-blue-600 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`px-6 pb-4 text-sm sm:text-base transition-all duration-200 ${
                  openIndex === index ? 'block' : 'hidden'
                } ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;