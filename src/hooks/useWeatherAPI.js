import { useState, useEffect, useCallback } from 'react';

export default function useWeatherAPI(location, unit) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchData = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }, []);

  const fetchWeatherData = useCallback(async (loc = location) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchData(
        `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=${unit}&appid=${API_KEY}`
      );
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [location, unit, API_KEY, fetchData]);

  const fetchForecastData = useCallback(async (loc = location) => {
    try {
      const data = await fetchData(
        `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&units=${unit}&appid=${API_KEY}`
      );
      setForecast(data);
    } catch (err) {
      console.error('Forecast error:', err);
    }
  }, [location, unit, API_KEY, fetchData]);

  const getUserLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMsg = 'Geolocation not supported by your browser';
        setError(errorMsg);
        reject(new Error(errorMsg));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const geoData = await fetchData(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            );

            if (!geoData.length) {
              const errorMsg = 'No location found from coordinates';
              setError(errorMsg);
              reject(new Error(errorMsg));
              return;
            }

            const cityName = geoData[0].name;
            await Promise.all([
              fetchWeatherData(cityName),
              fetchForecastData(cityName)
            ]);
            resolve(cityName);
          } catch (err) {
            const errorMsg = 'Failed to get weather for your location';
            setError(errorMsg);
            reject(new Error(errorMsg));
          }
        },
        (geoError) => {
          const errorMsg =
            geoError.code === 1
              ? 'Location access was denied by the user.'
              : 'Unable to retrieve your location.';
          setError(errorMsg);
          reject(new Error(errorMsg));
        }
      );
    });
  }, [API_KEY, fetchData, fetchWeatherData, fetchForecastData]);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchWeatherData(),
        fetchForecastData()
      ]);
    };
    loadData();
  }, [fetchWeatherData, fetchForecastData]);

  return {
    weatherData,
    forecast,
    isLoading,
    error,
    getUserLocation
  };
}
