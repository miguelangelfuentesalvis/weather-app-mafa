export default function Forecast({ forecast, unit }) {
  const processForecastData = () => {
    if (!forecast?.list) return []

    const dailyData = {}
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000)
      date.setHours(0, 0, 0, 0)
      if (date.getTime() === today.getTime()) return

      const dayKey = date.toISOString().split('T')[0]
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = {
          dt: item.dt,
          temps: [],
          weather: item.weather[0]
        }
      }
      dailyData[dayKey].temps.push(item.main.temp)
    })

    return Object.values(dailyData).map(day => ({
      ...day,
      temp_min: Math.min(...day.temps),
      temp_max: Math.max(...day.temps)
    })).slice(0, 5)
  }

  const getDayName = (timestamp, index) => {
    if (index === 0) return "Tomorrow"
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const getWeatherIconPath = (iconCode) => {
    return `/icons/weather/${iconCode}.png`
  }

  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
        {processForecastData().map((day, index) => (
          <div key={day.dt} className="bg-[#1e213a] p-4 flex flex-col items-center text-center">
            <p>{getDayName(day.dt, index)}</p>
            <img
              src={getWeatherIconPath(day.weather.icon)}
              alt={day.weather.description}
              className="w-15 h-15 my-2"
              onError={(e) => {
                e.target.src = `https://openweathermap.org/img/wn/${day.weather.icon}.png`
              }}
            />
            <div className="flex justify-between w-full mt-2">
              <span>{Math.round(day.temp_max)}°{unit === 'metric' ? 'C' : 'F'}</span>
              <span className="text-[#a09fb1]">
                {Math.round(day.temp_min)}°{unit === 'metric' ? 'C' : 'F'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
