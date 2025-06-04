import React from 'react';
import { Link } from 'react-router-dom';
import { Presentation } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Presentation className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-semibold text-gray-900">PresentAI</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/build" className="text-gray-600 hover:text-blue-600 transition-colors">
                Create
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;