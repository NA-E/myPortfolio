import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import JournalIndexPage from './pages/JournalIndexPage';
import JournalPostPage from './pages/JournalPostPage';
import PortalPage from './pages/PortalPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client portal — its own slim brand chrome, no marketing Header/Footer */}
        <Route path="/portal/:token" element={<PortalPage />} />

        {/* Marketing site */}
        <Route
          path="*"
          element={
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
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
