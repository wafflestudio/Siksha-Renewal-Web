import React from 'react';
import ContextProvider from './components/ContextProvider';
import TopContainer from './components/TopContainer';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <ContextProvider>
        <TopContainer />
      </ContextProvider>
    </div>
  );
};

export default App;