import React from 'react';
import './App.css';
import Editor from './components/Editor';
import { MondaySDKProvider } from './components/MondaySDKContext';

const App = () => (
  <MondaySDKProvider>
    <Editor />
  </MondaySDKProvider>
);

export default App;
