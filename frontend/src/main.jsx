import { createRoot } from 'react-dom/client';
import './app/index.css';
import App from './app/App.jsx';
import { AppContextProvider } from './app/app.context.jsx';

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);