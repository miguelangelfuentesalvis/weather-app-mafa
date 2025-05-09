export default function Highlights({ weatherData }) {
  const getWindDirection = (deg) => {
    const directions = [
      'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
    ];
    return directions[Math.round(deg / 22.5) % 16];
  };

  if (!weatherData) return null;

  return (
    <div>
      <h2 className="text-2xl mb-5">Today's Highlights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Wind Status */}
        <div className="bg-[#1e213a] p-5 flex flex-col items-center text-center">
          <p className="text-[#a09fb1] mb-2">Wind status</p>
          <div className="my-2">
            <span className="text-6xl font-bold">
              {Math.round(weatherData.wind.speed)}
            </span>
            <span className="text-4xl font-medium"> m/s</span>
          </div>
          <div className="flex items-center mt-2">
            <div
              className="bg-[#616475] rounded-full w-7 h-7 flex items-center justify-center mr-2"
              style={{ transform: `rotate(${weatherData.wind.deg}deg)` }}
            >
              <img
                src="/icons/navigation.svg"
                alt="Wind direction"
                className="w-4 h-4"
              />
            </div>
            <span>{getWindDirection(weatherData.wind.deg)}</span>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-[#1e213a] p-5 flex flex-col items-center text-center">
          <p className="text-[#a09fb1] mb-2">Humidity</p>
          <div className="my-2">
            <span className="text-6xl font-bold">
              {weatherData.main.humidity}
            </span>
            <span className="text-4xl font-medium">%</span>
          </div>
          <div className="w-4/5 mt-2">
            <div className="flex justify-between text-xs mb-0.5">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <div className="h-2 bg-[#e7e7eb] rounded-full">
              <div
                className="h-full bg-[#ffec65] rounded-full"
                style={{ width: `${weatherData.main.humidity}%` }}
              ></div>
            </div>
            <div className="text-right text-xs mt-0.5">%</div>
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-[#1e213a] p-5 flex flex-col items-center text-center">
          <p className="text-[#a09fb1] mb-2">Visibility</p>
          <div className="my-2">
            <span className="text-6xl font-bold">
              {(weatherData.visibility / 1000).toFixed(1)}
            </span>
            <span className="text-4xl font-medium"> km</span>
          </div>
        </div>

        {/* Air Pressure */}
        <div className="bg-[#1e213a] p-5 flex flex-col items-center text-center">
          <p className="text-[#a09fb1] mb-2">Air Pressure</p>
          <div className="my-2">
            <span className="text-6xl font-bold">
              {weatherData.main.pressure}
            </span>
            <span className="text-4xl font-medium"> mb</span>
          </div>
        </div>
      </div>
    </div>
  );
}
