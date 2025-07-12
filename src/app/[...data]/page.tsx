'use client';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { type Country } from '../components/types';
import { ThemeContext } from '../context/context';

const CountryPage = () => {
  const params = useParams();
  const router = useRouter();
  const { mode, modes } = useContext(ThemeContext)!;

  // Safely extract params with type guards
  const countryParams = Array.isArray(params?.data) ? params.data : [];
  const countryName = countryParams[0] as string | undefined;
  const countryNumericCode = countryParams[1] as string | undefined;

  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!countryNumericCode) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/data.json');
        const countries = await response.json();
        
        const currentCountry = countries.find((c: Country) => c.numericCode === countryNumericCode);
        setCountry(currentCountry);

        if (currentCountry?.borders && currentCountry.borders.length > 0) {
          const borders = countries.filter((c: Country) => 
            currentCountry.borders.includes(c.alpha3Code)
          );
          setBorderCountries(borders);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [countryNumericCode]);

  if (isLoading) {
    return (
      <div className={`w-screen h-screen flex items-center justify-center ${modes[mode].bgColor}`}>
        <h2 className={`text-2xl font-bold ${modes[mode].textColor}`}>Loading...</h2>
      </div>
    );
  }

  if (!countryNumericCode || !country) {
    return (
      <div className={`w-screen h-screen flex items-center justify-center ${modes[mode].bgColor}`}>
        <h2 className={`text-2xl font-bold ${modes[mode].textColor}`}>Country not found</h2>
      </div>
    );
  }

  return (
    <section className={`min-h-screen ${modes[mode].bgColor} ${modes[mode].textColor} py-8 px-4 sm:px-8 md:px-16`}>
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => router.back()}
          className={`flex items-center gap-2 px-6 py-2 mb-16 rounded shadow ${modes[mode].bgElements} ${modes[mode].textColor}`}
        >
          <FaArrowLeft /> Back
        </button>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <img 
              src={country.flags.svg} 
              alt={`Flag of ${country.name}`} 
              className="w-full h-auto object-cover rounded shadow-lg"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-bold mb-6">{country.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-2">
                <p><span className="font-semibold">Native Name:</span> {country.nativeName}</p>
                <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
                <p><span className="font-semibold">Region:</span> {country.region}</p>
                <p><span className="font-semibold">Sub Region:</span> {country.subregion}</p>
                <p><span className="font-semibold">Capital:</span> {country.capital}</p>
              </div>
              
              <div className="space-y-2">
                <p><span className="font-semibold">Top Level Domain:</span> {country.topLevelDomain.join(", ")}</p>
                <p><span className="font-semibold">Currencies:</span> {country.currencies?.map((currency) => currency.name).join(", ")}</p>
                <p><span className="font-semibold">Languages:</span> {country.languages?.map((language) => language.name).join(", ")}</p>
              </div>
            </div>

            {borderCountries.length > 0 && (
              <div>
                <h2 className="font-semibold mb-4">Border Countries:</h2>
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((borderCountry) => (
                    <button
                      key={borderCountry.alpha3Code}
                      className={`px-4 py-1 rounded shadow ${modes[mode].bgElements} ${modes[mode].textColor}`}
                      onClick={() => router.push(`/${borderCountry.name}/${borderCountry.numericCode}`)}
                    >
                      {borderCountry.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryPage;