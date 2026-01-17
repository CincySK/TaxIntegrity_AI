import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import InfoPage from './components/InfoPage';
import Simulator from './components/Simulator';
import { HomePage, AuditsPage, EvasionPage, ProgressPage, SourcesPage } from './components/WebsiteViews';
import { AppView } from './types';

const App = () => {
  // Default to Home page (Public Website)
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  // Determine if we are in "App Mode" (Dashboard/Chat) or "Website Mode" (Home/Landing)
  const isAppMode = [
    AppView.DASHBOARD, 
    AppView.CHAT, 
    AppView.GUIDELINES, 
    AppView.RESOURCES
  ].includes(currentView);

  const renderView = () => {
    switch (currentView) {
      // Public Website Views
      case AppView.HOME:
        return <HomePage onChangeView={setCurrentView} />;
      case AppView.AUDITS:
        return <AuditsPage />;
      case AppView.EVASION:
        return <EvasionPage />;
      case AppView.PROGRESS:
        return <ProgressPage />;
      case AppView.SOURCES:
        return <SourcesPage />;
      case AppView.SIMULATOR:
        return <Simulator />;
        
      // App Views
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.CHAT:
        return <ChatInterface />;
      case AppView.GUIDELINES:
        return <InfoPage />;
      case AppView.RESOURCES:
        return (
          <div className="flex items-center justify-center h-screen text-slate-500 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Resource Library</h2>
                <p>External resources and PDF downloads coming soon.</p>
            </div>
          </div>
        );
      default:
        return <HomePage onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex bg-slate-900 min-h-screen text-slate-200">
      {isAppMode ? (
        <>
          <Sidebar currentView={currentView} onChangeView={setCurrentView} />
          <main className="flex-1 ml-64 relative">
            {renderView()}
          </main>
        </>
      ) : (
        <>
          <Navbar currentView={currentView} onChangeView={setCurrentView} />
          <main className="flex-1 relative w-full">
            {renderView()}
          </main>
        </>
      )}
    </div>
  );
};

export default App;