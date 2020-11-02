import React from 'react';
import './App.css';
import mondaySdk from 'monday-sdk-js';

const monday = mondaySdk();

const App = () => (
  <div className="App">Hello, monday Apps!</div>
);

export default App;
