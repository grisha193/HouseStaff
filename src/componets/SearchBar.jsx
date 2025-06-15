import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearchSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const fetchSuggestions = (searchQuery) => {
    const encodedQuery = encodeURI(searchQuery.trim());
    return fetch(`http://localhost:8000/api/items/search?name=${encodedQuery}`)
      .then(res => res.json())
      .then(data => {
        setSuggestions(data);
        setNotFound(data.length === 0);
      });
  };

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      setNotFound(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchSuggestions(query)
        .catch(err => {
          console.error('Ошибка поиска:', err);
          setSuggestions([]);
          setNotFound(true);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (item) => {
    setQuery(item.name);
    setSuggestions([]);
    setNotFound(false);
    onSearchSelect(item);
  };

  const handleSearchClick = () => {
    if (query.trim() === '') return;

    setIsSearching(true);
    fetchSuggestions(query)
      .finally(() => setIsSearching(false));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="search-bar" style={{ position: 'relative', maxWidth: 400, margin: '0 auto' }}>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Поиск товаров..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button 
          onClick={handleSearchClick} 
          disabled={isSearching}
          style={{ marginLeft: '8px', padding: '8px 12px', border: '1px solid black'}}
        >
          {isSearching ? '...' : 'Поиск'}
        </button>
      </div>

      {notFound && <div style={{ marginTop: 8, color: 'gray' }}>Ничего не найдено</div>}

      {suggestions.length > 0 && (
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          position: 'absolute',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          width: '100%',
          zIndex: 10,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {suggestions.map(item => (
            <li
              key={item.id}
              onClick={() => handleSuggestionClick(item)}
              style={{ 
                padding: '8px', 
                cursor: 'pointer', 
                borderBottom: '1px solid #eee',
                ':hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;