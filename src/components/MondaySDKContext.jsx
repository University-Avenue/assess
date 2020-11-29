import React, { createContext, useContext, useState } from 'react';
import mondaySdk from 'monday-sdk-js';

const MondaySDKContext = createContext();

export const useMondaySDK = () => useContext(MondaySDKContext);

export const MondaySDKProvider = ({ children }) => {
  const [monday, setMonday] = useState(mondaySdk());

  if (process.env.REACT_APP_MONDAY_API_KEY) {
    monday.setToken(process.env.REACT_APP_MONDAY_API_KEY);
  }

  return (
    <MondaySDKContext.Provider value={monday}>
      {children}
    </MondaySDKContext.Provider>
  );
};
