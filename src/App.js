import React from 'react';
import './App.css';
import mondaySdk from 'monday-sdk-js';
import Editor from './components/Editor';
import 'bootstrap/dist/css/bootstrap.min.css';

const monday = mondaySdk();

const App = () => (
  <Editor />
);

export default App;
