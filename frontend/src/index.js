import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './contexts/UserContext';
import { TripContextProvider } from './contexts/TripContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <UserContextProvider>
      <TripContextProvider>
        <App />
      </TripContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

