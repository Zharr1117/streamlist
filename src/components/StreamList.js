// src/components/StreamList.js
import React, { useState } from 'react';

const StreamList = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User input:", inputValue);
    setInputValue('');
  };

  return (
    <div className="streamlist">
      <h2>Create Your Streaming List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a movie or show"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default StreamList;
