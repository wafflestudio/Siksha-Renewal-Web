import React, { createContext, useMemo, useReducer, Dispatch } from 'react';
import Provider from './components/Provider';
import TopContainer from './components/TopContainer';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Provider>
        <TopContainer />
      </Provider>
    </div>
  );
};

export default App;