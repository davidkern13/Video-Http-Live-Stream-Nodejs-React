import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';

import store from './store';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}><App /></Provider>);