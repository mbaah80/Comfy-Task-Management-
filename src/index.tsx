import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // Import the Provider component
import { store } from './redux/store'; // Import the store

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}> {/* Wrap your app in the Provider */}
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
