import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store.state';
import { ContextProvider } from './context/context';

// Main entry point for the React application
ReactDOM.render(
  <React.StrictMode>
    {/* Router wrapper to enable routing throughout the app */}
    <Router>
      {/* Provider wrapper to pass the Redux store down to the components */}
      <Provider store={store}>
        {/* ContextProvider wrapper to provide global context */}
        <ContextProvider>
          {/* AppRouter component to handle routing */}
          <AppRouter />
        </ContextProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root') // Mounting the application to the 'root' div in the HTML
);