"use client"
import React, { useContext } from 'react';
import { ThemeContext } from '../context/context';
import { FaSearch } from "react-icons/fa";

interface ControlDisplayProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
}

const ControlDisplay = ({
  inputValue,
  setInputValue,
  selectedRegion,
  setSelectedRegion,
}: ControlDisplayProps) => {
  const { mode, modes } = useContext(ThemeContext)!;
  
  return (
    <div className={`py-8 px-4 sm:px-8 md:px-16 ${modes[mode].bgColor}`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
        <div className={`relative flex items-center w-full sm:w-96 shadow rounded ${modes[mode].bgElements}`}>
        <span className={`absolute left-4 ${modes[mode].textColor}`}>
            <FaSearch />
          </span>
          <input
            type="text"
            className={`w-full py-3 pl-12 pr-4 rounded focus:outline-none ${modes[mode].textColor} ${modes[mode].bgElements}`}
            placeholder="Search for a country..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        
        <select
          className={`py-3 px-4 rounded shadow focus:outline-none ${modes[mode].bgElements} ${modes[mode].textColor}`}
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
};

export default ControlDisplay;