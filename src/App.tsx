import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/public/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/public/Signup";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./pages/user/Dashboard";
import { Toaster } from "sonner";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Profile from "./pages/common/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import UnAuthorized from "./pages/Unauthorized";
import AuthWrapper from "./components/AuthWrapper";

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Router>
        <AuthWrapper>
          <Routes>
            {/* public routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<NotFound />} />

            <Route element={<UserLayout />}>
              <Route path="/test" element={<AdminDashboard />} />
            </Route>

            {/* protected routes with valid authentication and user roles */}
            {/* User routes */}
            <Route element={<ProtectedRoute allowedRoles={["User"]} />}>
              <Route element={<UserLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Route>

            {/* admin routes */}
            <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
              <Route element={<UserLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Route>

            {/* admin + user routes */}
            <Route
              element={<ProtectedRoute allowedRoles={["Admin", "User"]} />}
            >
              <Route element={<UserLayout />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* admin + user route without layout */}
              <Route path="/unauthorized" element={<UnAuthorized />} />
            </Route>
          </Routes>
        </AuthWrapper>
      </Router>
      <Toaster position="top-right" richColors duration={2000} />
    </div>
  );
};

export default App;
