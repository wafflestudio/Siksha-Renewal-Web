import React from 'react';
import FixedHeader from './components/FixedHeader';
import TopContainer from './components/TopContainer';

import './App.css';

export type Date = 'today' | 'tomorrow';
export type Meal = 'BR' | 'LU' | 'DN';

const App = () => {
  return (
    <div className="App">
      <TopContainer />
    </div>
  );
};

export default App;