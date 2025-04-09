import React from 'react';
import './ToolList.css';

function ToolList({ tools }) {
  return (
    <div className="tool-list">
      {tools.map((tool) => (
        <div className="tool-card" key={tool._id}>
          <h3>{tool.name}</h3>
          <p><strong>Version:</strong> {tool.version}</p>
          <p><strong>Category:</strong> {tool.category}</p>
          <a href={tool.sourceUrl} target="_blank" rel="noreferrer">View Source</a>
        </div>
      ))}
    </div>
  );
}

export default ToolList;
