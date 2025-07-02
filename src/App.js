// memory-lane-app: Flipbook-only version (no authentication)

import React from 'react';
import Flipbook from './Flipbook';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="center-title">Memory Lane 💖</h1>
      <Flipbook />
    </div>
  );
}

export default App;