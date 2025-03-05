import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WithNavbarLayout from './components/navbar/WithNavbar';
import WithoutNavbarLayout from './components/navbar/WithoutNavbar';

import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import BookingPage from './pages/BookingPage';
import OrganizationPage from './pages/OraginzationPage';
import WelcomePage from './pages/LandingPage';
import RegisterPage from './pages/Auth/RegisterPage'
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyEmailPage from './pages/Auth/VerifyEmail';
import VerificationSuccessPage from './pages/Auth/VerificationSuccess';
import ResetPasswordPage from './pages/Auth/ResetPassword';
import PasswordChangeSuccessPage from './pages/Auth/PasswordChangeSuccess';
import TotalExpenses from './pages/TotalExpenses';

function App() {
  return (
    <div className="flex flex-col h-screen w-screen">
      {/* App layout ensures full screen height */}
      <Router>
        <Routes>
          {/* Routes with Navbar */}
          <Route element={<WithNavbarLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/organization" element={<OrganizationPage />} />
            <Route path="/totalexpenses" element={<TotalExpenses />} />
          </Route>

          {/* Routes without Navbar */}
          <Route element={<WithoutNavbarLayout />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/verify" element={<VerifyEmailPage />} />
            <Route path="/verifySuccess" element={<VerificationSuccessPage />} />
            <Route path="/resetpassword" element={<ResetPasswordPage />} />
            <Route path="/resetSuccess" element={<PasswordChangeSuccessPage />} />
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
