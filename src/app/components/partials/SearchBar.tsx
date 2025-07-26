// components/partials/SearchBar.tsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isDarkMode: boolean;
}> = ({ value, onChange, onSearch }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="search-container desktop-only">
      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <button className="search-btn" onClick={onSearch}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;