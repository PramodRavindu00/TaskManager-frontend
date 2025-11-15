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
import Init from "./components/Init";

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Router>
        <Init>
          <Routes>
            {/* public routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<NotFound />} />

            {/* protected routes */}
            <Route element={<UserLayout />}>
              {/* user routes */}
              <Route element={<ProtectedRoute allowedRoles={["User"]} />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              {/* admin routes */}
              <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>

              {/* common routes */}
              <Route
                element={<ProtectedRoute allowedRoles={["User", "Admin"]} />}
              >
                <Route path="/profile" element={<Profile />} />
                <Route path="/unauthorized" element={<UnAuthorized />} />
              </Route>
            </Route>
          </Routes>
        </Init>
      </Router>
      <Toaster position="top-right" richColors duration={2000} />
    </div>
  );
};

export default App;
