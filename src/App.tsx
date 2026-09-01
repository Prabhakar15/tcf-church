import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/HomePage';
import DailyWordPage from './pages/DailyWordPage';
import SermonsPage from './pages/SermonsPage';
import EventsPage from './pages/EventsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import PastorPage from './pages/PastorPage';
import PrayerPage from './pages/PrayerPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import DailyWordsAdminPage from './pages/admin/DailyWordsAdminPage';
import EventsAdminPage from './pages/admin/EventsAdminPage';
import ServicesAdminPage from './pages/admin/ServicesAdminPage';
import SermonsAdminPage from './pages/admin/SermonsAdminPage';
import PrayerRequestsAdminPage from './pages/admin/PrayerRequestsAdminPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public pages */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="daily-word" element={<DailyWordPage />} />
            <Route path="sermons" element={<SermonsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="pastor" element={<PastorPage />} />
            <Route path="prayer" element={<PrayerPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Admin pages */}
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/daily-words"
            element={
              <ProtectedRoute>
                <DailyWordsAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/events"
            element={
              <ProtectedRoute>
                <EventsAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/services"
            element={
              <ProtectedRoute>
                <ServicesAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/sermons"
            element={
              <ProtectedRoute>
                <SermonsAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/prayer-requests"
            element={
              <ProtectedRoute>
                <PrayerRequestsAdminPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
