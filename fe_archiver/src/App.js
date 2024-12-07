import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/loginpage.js';
import HomePage from './pages/homepage.js';
import ViewPage from './pages/viewpage.js';
import InputPage from './pages/inputpage.js';
import AdminPage from './pages/adminpage.js';
import EditPage from './pages/editpage.js';
import PrivateRoute from './components/privateroute';  
import ArchivesPage from './pages/archivepage.js';
import ReviewPage from './pages/reviewpage.js';
import HistoryPage from './pages/historypage.js';

function App() {
  const [showAlert, setShowAlert] = useState(false);

  const role = localStorage.getItem('role');

  // Admin-only routes
  const AdminOnlyRoute = ({ children }) => {
    if (role !== 'admin') {
      setShowAlert(true);
      return <Navigate to="/home" replace />;
    }
    return children;
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <div className="fixed top-0 left-0 z-50 w-full">
          <div className="flex items-center justify-between px-4 py-3 text-center text-white bg-red-500">
            <span>Anda tidak memiliki akses!</span>
            <button 
              onClick={handleCloseAlert} 
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <Router>
        <div className="h-[100vh]">
          <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route
              path="/home"
              element={<PrivateRoute element={<HomePage />} />}
            />
            <Route
              path="/view"
              element={<PrivateRoute element={<ViewPage />} />}
            />
            <Route
              path="/input"
              element={<PrivateRoute element={<InputPage />} />}
            />
            <Route
              path="/edit/:id"
              element={<PrivateRoute element={<EditPage />} />}
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute 
                  element={
                    <AdminOnlyRoute>
                      <AdminPage />
                    </AdminOnlyRoute>
                  } 
                />
              }
            />
            <Route
              path="/archives"
              element={<PrivateRoute element={<ArchivesPage />} />}
            />
            <Route
              path="/review"
              element={
                <PrivateRoute 
                  element={
                    <AdminOnlyRoute>
                      <ReviewPage />
                    </AdminOnlyRoute>
                  } 
                />
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute 
                  element={
                    <AdminOnlyRoute>
                      <HistoryPage />
                    </AdminOnlyRoute>
                  } 
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;