"use client"
import React, { useContext } from 'react';
import { ThemeContext } from '../context/context';
import { type Country } from './types';
import { type Currency } from './types';
import { type Language } from './types';
import { type RegionalBloc } from './types';

interface DisplayCardProps {
  country?: Country;
}

const DisplayCard = ({ country }: DisplayCardProps) => {
  const { mode, modes } = useContext(ThemeContext)!;

  if (!country) {
    return (
      <div className={`w-[90%] h-60 sm:w-50 sm:h-70 sm:mx-2 sm:my-2 flex items-center justify-between flex-col shadow-lg rounded-md ${modes?.[mode]?.bgElements} ${modes?.[mode]?.textColor}`}>
        <div className="w-full h-1/2 bg-red-400  flex justify-center items-center">
          Loading...
        </div>
        <div className={`w-full flex items-center justify-center text-center h-1/2 ${modes?.[mode]?.textColor}`}>
          Please wait...
        </div>
      </div>
    );
  }

  return (
    <div className={`w-[90%] h-60 sm:w-50 sm:h-70 sm:mx-2 sm:my-2 flex items-center text-sm justify-between flex-col shadow-lg rounded-md ${modes[mode].bgElements} ${modes[mode].textColor}`}>
      <div className="w-full h-1/2 ">
        <img src={country.flags.svg} className="w-full h-full object-cover overflow-hidden"/>
      </div>
      <div className={`w-full flex flex-col px-4 py-4 h-1/2  gap-3 ${modes[mode].textColor}`}>
        

        <div className="flex w-full font-semibold ">
          {country.name}
        </div>
        <div className="flex flex-col w-full">

          <div className="span">
            <span className='font-semibold'>Population:</span>
            <span className='font-light'> {country.population}</span>
</div>
          <div className="span ">
            <span className='font-semibold'>Region:</span>
            <span  className='font-light'> {country.region}</span>
</div>
          <div className="span" >
            <span className='font-semibold'>Capital:</span>
            <span  className='font-light'> {country.capital}</span>
</div>
        </div>
      </div>

    </div>
  );
};


export default DisplayCard;
