import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import JournalIndexPage from './pages/JournalIndexPage';
import JournalPostPage from './pages/JournalPostPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/journal" element={<JournalIndexPage />} />
            <Route path="/journal/:slug" element={<JournalPostPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
