import React from 'react';

export default function WeatherCard({ weatherData, unit, onSearchClick, onLocationClick }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-[30px]">
      <div className="flex justify-between w-full mb-[30px]">
        <button
          onClick={onSearchClick}
          className="bg-[#6e707a] text-[#e7e7eb] px-[18px] py-[10px] cursor-pointer"
        >
          Search for Places
        </button>
        <button
          onClick={onLocationClick}
          className="bg-[#6e707a] rounded-full w-10 h-10 flex items-center justify-center"
        >
          <img
            src="/icons/location.svg"
            alt="Get location"
            className="w-5 h-5"
          />
        </button>
      </div>

      <div className="my-[20px]">
        <img
          src={`/icons/weather/${weatherData.weather[0].icon}.png`}
          alt={weatherData.weather[0].description}
          className="w-[150px] h-[150px]"
          onError={(e) => {
            e.target.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
          }}
        />
      </div>

      <div className="my-[20px]">
        <h1 className="text-[144px] font-medium leading-none">
          {Math.round(weatherData.main.temp)}
          <span className="text-[48px] text-[#a09fb1]">
            °{unit === 'metric' ? 'C' : 'F'}
          </span>
        </h1>
      </div>

      <h2 className="text-[36px] font-semibold text-[#a09fb1] mb-[30px]">
        {weatherData.weather[0].main}
      </h2>

      <div className="text-[#88869d] mt-[30px]">
        <p>Today • {formatDate(weatherData.dt)}</p>
        <p className="flex items-center justify-center my-[10px]">
          <img
            src="/icons/location_on.svg"
            alt="Location"
            className="w-5 h-5 mr-1"
          />
          {weatherData.name}
        </p>
      </div>
    </div>
  );
}
