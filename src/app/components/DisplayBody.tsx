"use client"
import React, { useContext, useState, useEffect } from 'react';
import DisplayCard from "./DisplayCard";
import { ThemeContext } from '../context/context';
import ControlDisplay from './ControlDisplay';
import { type Country } from './types';
import Link from 'next/link';

const DisplayBody = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { mode, modes } = useContext(ThemeContext)!;
  const [countries, setCountries] = React.useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const countries = await response.json();
        setCountries(countries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesRegion = selectedRegion === '' || country.region === selectedRegion;
    const matchesSearch = country.name.toLowerCase().includes(inputValue.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <section className={`min-h-screen ${modes[mode].bgColor} ${modes[mode].textColor}`}>
      <ControlDisplay
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
      
      <div className="py-8 px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCountries.map((country) => (
            <Link
              key={country.numericCode}
              href={`/${country.name}/${country.numericCode}`}
              className="hover:scale-105 transition-transform duration-200"
            >
              <DisplayCard country={country} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DisplayBody;