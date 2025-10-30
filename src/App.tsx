import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/public/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/public/Home";
import Signup from "./pages/public/Signup";
import PublicLayout from "./layouts/PublicLayout";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./pages/user/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
