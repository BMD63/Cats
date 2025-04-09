import React from 'react';
import CatImage from './components/CatImage';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Cat Image App</h1>
      <CatImage />
    </div>
  );
};

export default App;