import React, { useEffect } from 'react';
import './App.css';
import CustomRouter from './Router/CustomRouter';
import ErrorBoundary from './Providers/ErrorBoundary';
import MultiProvider from './Providers/MultiProvider';

function App() {
  const height = window.innerHeight;
  useEffect(() => {
    const content = document.getElementById('root');
    if (content) {
      content.style.height = `${height}px`;
    }
  }, [height]);
  return (
    <ErrorBoundary>
      <MultiProvider>
        <CustomRouter />
      </MultiProvider>
    </ErrorBoundary>
  );
}

export default App;
