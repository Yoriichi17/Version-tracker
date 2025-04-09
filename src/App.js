import React, { useEffect, useState } from 'react';
import ToolList from './components/ToolList';
import AddToolForm from './components/AddToolForm';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const [tools, setTools] = useState([]);
  const [filter, setFilter] = useState('All');

  const fetchTools = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tools');
      const data = await res.json();
      setTools(data);
    } catch (err) {
      console.error('Error fetching tools:', err);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const filteredTools = filter === 'All' ? tools : tools.filter(t => t.category === filter);

  // Matrix Background Effect
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789';
    const letters = katakana.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px "Press Start 2P", monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      {/* Matrix Canvas Background */}
      <canvas id="matrix-canvas"></canvas>

      <h1 className="glow-text">📦 Version Tracker</h1>

      <AddToolForm onAdd={fetchTools} />
      <FilterBar setFilter={setFilter} />
      <ToolList tools={filteredTools} />
    </div>
  );
}

export default App;
