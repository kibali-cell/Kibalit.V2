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
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AuthRoute } from './components/route-protection/ProtectedRoutes';

function App() {
  return (
    <div className="flex flex-col h-screen w-screen">
      {/* App layout ensures full screen height */}
      <AuthProvider>
        <Router>
          <Routes>
            {/* Routes with Navbar - Protected */}
            <Route element={<WithNavbarLayout />}>
              <Route path="/home" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path="/booking" element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              } />
              <Route path="/organization" element={
                <ProtectedRoute>
                  <OrganizationPage />
                </ProtectedRoute>
              } />
              <Route path="/totalexpenses" element={
                <ProtectedRoute>
                  <TotalExpenses />
                </ProtectedRoute>
              } />
            </Route>
            
            {/* Routes without Navbar */}
            <Route element={<WithoutNavbarLayout />}>
              {/* Your landing page is your login page */}
              <Route path="/" element={
                <AuthRoute>
                  <WelcomePage />
                </AuthRoute>
              } />
              <Route path="/login" element={
                <AuthRoute>
                  <LoginPage />
                </AuthRoute>
              } />
              <Route path="/register" element={
                <AuthRoute>
                  <RegisterPage />
                </AuthRoute>
              } />
              <Route path="/forgotpassword" element={
                <AuthRoute>
                  <ForgotPassword />
                </AuthRoute>
              } />
              
              {/* Public Routes */}
              <Route path="/verify" element={<VerifyEmailPage />} />
              <Route path="/verifySuccess" element={<VerificationSuccessPage />} />
              <Route path="/resetpassword" element={<ResetPasswordPage />} />
              <Route path="/resetSuccess" element={<PasswordChangeSuccessPage />} />
            </Route>
            
            {/* Fallback 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;