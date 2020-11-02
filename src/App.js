import React from 'react';
import './App.css';
import mondaySdk from 'monday-sdk-js';
import Editor from './components/Editor';

const monday = mondaySdk();

const App = () => (
  <Editor />
);

export default App;
