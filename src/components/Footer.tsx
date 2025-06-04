import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} PresentAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;