import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryItem from './components/CountryItem';
import FilterList from './components/FilterList';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [newFilter, setNewFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

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
            <CountryItem country={selectedCountry} />
          ) : filteredCountries.length === 1 ? (
            <CountryItem country={filteredCountries[0]} />
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
