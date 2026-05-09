import React from 'react';

const TopBar = () => {
  return (
    <header className="flex justify-between md:justify-end items-center px-6 py-3 pb-2">
      <button className="hover:text-white cursor-pointer text-lg transition-colors">
          Login
      </button>
    </header>
  );
};

export default TopBar;
