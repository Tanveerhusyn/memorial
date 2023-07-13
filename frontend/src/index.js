import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './assets/fonts/RastantyCortez.ttf'
import { MemorialContextProvider } from './context/MemorialContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
    <MemorialContextProvider>

    <App />
    </MemorialContextProvider>
   </BrowserRouter>
  </React.StrictMode>
);

