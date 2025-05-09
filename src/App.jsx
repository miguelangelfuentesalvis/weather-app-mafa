import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import Forecast from './components/Forecast'
import Highlights from './components/Highlights'
import SearchModal from './components/SearchModal'
import UnitToggle from './components/UnitToggle'
import useWeatherAPI from './hooks/useWeatherAPI'
import './index.css'

export default function App() {
  const [location, setLocation] = useState('London')
  const [unit, setUnit] = useState('metric')
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [error, setError] = useState(null)

  const {
    weatherData,
    forecast,
    isLoading,
    getUserLocation
  } = useWeatherAPI(location, unit)

  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by this browser.")
        return
      }
      try {
        const cityName = await getUserLocation()
        setLocation(cityName)
      } catch (err) {
        if (err.message === "Location access was denied by the user.") {
          setError("Access to location was denied. Please enter a city manually.")
        } else {
          setError(err.message)
        }
        console.error('Geolocation error:', err)
      }
    }

    fetchLocation()
  }, [])

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric')
  }

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
    setShowSearchModal(false)
  }

  if (isLoading && !weatherData) {
    return (
      <div className="flex items-center justify-center h-screen text-[#e7e7eb] text-2xl">
        Loading weather data...
      </div>
    )
  }

  if (error && !weatherData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-[#ff6b6b] text-xl p-4 text-center">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#6e707a] text-[#e7e7eb] px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#100e1d] text-[#e7e7eb] font-sans">
      <div className="flex flex-col md:flex-row h-full md:h-screen">
        {/* Left Panel */}
        <div className="bg-[#1e213a] p-5 w-full md:w-[30%] md:h-screen">
          <WeatherCard
            weatherData={weatherData}
            unit={unit}
            onSearchClick={() => setShowSearchModal(true)}
            onLocationClick={getUserLocation} // Se puede llamar directamente a la función
          />
        </div>

        {/* Right Panel */}
        <div className="p-5 md:p-10 w-full md:w-[70%] overflow-y-auto">
          <UnitToggle unit={unit} onToggle={toggleUnit} />
          <Forecast forecast={forecast} unit={unit} />
          <Highlights weatherData={weatherData} />

          <footer className="text-center text-[#a09fb1] mt-10 text-sm">
            created by MAFA - devChallenges.io
          </footer>
        </div>
      </div>

      {showSearchModal && (
        <SearchModal
          onClose={() => setShowSearchModal(false)}
          onLocationSelect={handleLocationChange}
        />
      )}
    </div>
  )
}


