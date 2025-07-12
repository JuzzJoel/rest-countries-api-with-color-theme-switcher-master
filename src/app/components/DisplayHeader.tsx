"use client";
import React, { useContext } from 'react';
import { ThemeContext } from '../context/context';

const DisplayHeader = () => {
  const { mode, modes, setTheme } = useContext(ThemeContext)!;

  return (
    <header className={`w-full py-6 px-4 sm:px-8 md:px-16 shadow ${modes[mode].bgElements} ${modes[mode].textColor}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-lg sm:text-xl font-bold">Where in the world?</h1>
        <button 
          className="flex items-center gap-2 font-semibold"
          onClick={setTheme}
        >
          {modes[mode].icon} {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}

export default DisplayHeader;