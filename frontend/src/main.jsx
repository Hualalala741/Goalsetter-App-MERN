import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store';  // 引入 Redux Store
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// 

// // import App from './App';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     
//       <App />
//     
//   </React.StrictMode>
// );