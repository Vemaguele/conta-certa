// src/components/Layout/Header.jsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm h-16 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {user?.nome || 'Usuário'}
          </span>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <span className="text-sm">
              {user?.nome?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;