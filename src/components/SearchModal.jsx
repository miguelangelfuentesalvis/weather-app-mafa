import { useState } from 'react';

export default function SearchModal({ onClose, onLocationSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const searchCities = async (query) => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=3&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch suggestions');
      const data = await response.json();
      setSearchResults(data);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchCities(searchQuery);
  };

  const handleSuggestionClick = (city) => {
    onLocationSelect(city);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-50 flex justify-start items-start">
      <div className="bg-[#1e213a] w-full max-w-[500px] h-full p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-transparent border-none cursor-pointer"
        >
          <img
            src="/icons/close.svg"
            alt="Close"
            className="w-6 h-6"
          />
        </button>

        <form
          onSubmit={handleSearch}
          className="mt-[50px] flex gap-3"
        >
          <div className="relative flex-1">
            <img
              src="/icons/search.svg"
              alt="Search"
              className="absolute left-[15px] top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search location"
              className="w-full pl-[45px] pr-4 py-[15px] bg-transparent border border-[#e7e7eb] text-[#e7e7eb] text-base "
            />
          </div>
          <button
            type="submit"
            className="bg-[#3c47e9] text-white border-none px-5 py-[15px] text-base cursor-pointer "
          >
            Search
          </button>
        </form>

        {showSuggestions && (
          <div className="mt-10">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(result.name)}
                  className="w-full border border-transparent text-[#e7e7eb] px-5 py-[15px] text-left text-base cursor-pointer flex justify-between items-center mb-2.5  hover:border-[#616475] transition-colors"
                >
                  <span>
                    {result.name}
                    {result.state ? `, ${result.state}` : ''}
                    {result.country ? `, ${result.country}` : ''}
                  </span>
                  <span className="text-[#616475]">&gt;</span>
                </button>
              ))
            ) : (
              <div className="mt-10 text-center text-[#a09fb1]">
                <p>No locations found. Try another search term.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
