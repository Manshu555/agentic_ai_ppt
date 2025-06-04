import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BuildPresentation from './pages/BuildPresentation';
import { PresentationProvider } from './context/PresentationContext';

function App() {
  return (
    <PresentationProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="build" element={<BuildPresentation />} />
        </Route>
      </Routes>
    </PresentationProvider>
  );
}

export default App;