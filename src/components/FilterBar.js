import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterBar.css';

const categories = ['All', 'Frontend', 'Backend', 'Database'];

function FilterBar() {
  const [tools, setTools] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:5000/api/ver/gettools')
      .then((res) => {
        console.log("Fetched tools:", res.data); // debug
        setTools(res.data);
      })
      .catch((err) => {
        console.error('Error fetching tools:', err);
      });
  }, []);

  const filteredTools = filter === 'All'
    ? tools
    : tools.filter(tool =>
        tool.category.toLowerCase() === filter.toLowerCase()
      );

  return (
    <div>
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? 'active' : ''}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="tool-list">
        {filteredTools.map((tool) => (
          <div key={tool.name} className="tool-card">
            <h3>{tool.name}</h3>
            <p>Category: {tool.category}</p>
            <p>Version: {tool.version}</p>
            <a href={tool.sourceUrl} target="_blank" rel="noopener noreferrer">
              Visit Site
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
