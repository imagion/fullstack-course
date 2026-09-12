import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryItem from './components/CountryItem';
import FilterList from './components/FilterList';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [newFilter, setNewFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [weather, setWeather] = useState({
    latitude: 63.99792,
    longitude: 25.996704,
    generationtime_ms: 3.2722949981689453,
    utc_offset_seconds: 0,
    timezone: 'GMT',
    timezone_abbreviation: 'GMT',
    elevation: 115.0,
    current_units: {
      time: 'iso8601',
      interval: 'seconds',
      temperature_2m: '°C',
      weather_code: 'wmo code',
      wind_speed_10m: 'km/h',
      apparent_temperature: '°C',
    },
    current: {
      time: '2026-09-12T04:30',
      interval: 900,
      temperature_2m: 5.2,
      weather_code: 3,
      wind_speed_10m: 3.6,
      apparent_temperature: 3.6,
    },
  });

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((res) => {
        setCountries(res.data);
      });
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;

    setNewFilter(value);
    setSelectedCountry(null);

    if (!countries) return;

    const filterData = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilteredCountries(filterData);
  };

  const handleShow = (country) => {
    setSelectedCountry(country);
  };

  if (!countries) return;

  return (
    <>
      <div>
        find countries <input value={newFilter} onChange={handleFilter} />
      </div>
      {filteredCountries && (
        <>
          {filteredCountries.length > 10 ? (
            <div>Too many matches, specify another filter</div>
          ) : selectedCountry ? (
            <CountryItem country={selectedCountry} weather={weather} />
          ) : filteredCountries.length === 1 ? (
            <CountryItem country={filteredCountries[0]} weather={weather} />
          ) : filteredCountries.length > 1 ? (
            filteredCountries.map((country) => (
              <FilterList
                key={country.ccn3}
                country={country}
                handleShow={handleShow}
              />
            ))
          ) : null}
        </>
      )}
    </>
  );
};

export default App;
