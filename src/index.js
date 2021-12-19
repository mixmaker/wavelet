import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainState from "./context/MainState";

ReactDOM.render(
  <React.StrictMode>
    <MainState>
    <App />
    </MainState>
  </React.StrictMode>,
  document.getElementById('root')
);
