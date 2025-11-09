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

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position="top-right" richColors duration={2000} />
    </>
  );
};

export default App;
