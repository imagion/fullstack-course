const CountryItem = ({ country, weather }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={Object.values(country.flags)[0]} />

      <h2>Weather in {country.capital}</h2>
      <div>
        Temperature {weather.current.temperature_2m}
        {weather.current_units.temperature_2m}
      </div>
      {/* <img src={} alt='icon here'  /> */}
      <div>
        Wind {weather.current.wind_speed_10m}{' '}
        {weather.current_units.wind_speed_10m}
      </div>
    </>
  );
};

export default CountryItem;
