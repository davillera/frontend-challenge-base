"use client"
import React, { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };


  return (
    <div className={"bg-gray h-full px-4"}>
      <h1 className={"text-white text-3xl"}>Search</h1>
      <input
        type="text"
        value={query}
        onChange={inputChange}
        placeholder={"keywords"}
        className={"bg-darkgray p-3 text-white rounded-t-xl border-gray my-4"}
      />
    </div>
  );
};

export default Search;
