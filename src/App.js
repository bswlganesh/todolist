
import './App.css'
import Header from './components/Header'
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { Suspense } from 'react';
import RecycleBin from './components/RecycleBin'
import HomePage from './pages/HomePage';

// Lazy load the RecycleBin page for better performance
const LazyRecycleBin = React.lazy(() => import('./components/RecycleBin'));

export default function App() {
  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recycle-bin" element={<Suspense fallback={<div>Loading...</div>}><LazyRecycleBin /></Suspense>} />
      </Routes>
    </div>
  )
}
