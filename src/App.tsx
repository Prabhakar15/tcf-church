import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/HomePage';
import DailyWordPage from './pages/DailyWordPage';
import SermonsPage from './pages/SermonsPage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import PastorPage from './pages/PastorPage';
import PrayerPage from './pages/PrayerPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="daily-word" element={<DailyWordPage />} />
          <Route path="sermons" element={<SermonsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="pastor" element={<PastorPage />} />
          <Route path="prayer" element={<PrayerPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
