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
import { useSelector } from "react-redux";
import { selectTheme } from "./utils/redux/selectors";
import { useEffect } from "react";
import ProjectLayout from "./layouts/user/ProjectLayout";
import ProjectForm from "./pages/user/project/ProjectForm";
import TaskLayout from "./layouts/user/TaskLayout";
import ProjectListView from "./pages/user/project/ProjectListView";
import TaskListView from "./pages/user/task/TaskListView";
import TaskForm from "./pages/user/task/TaskForm";
const App = () => {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className="overflow-x-hidden bg-main text-main scrollbar-hide">
      <Router>
        <AuthWrapper>
          <Routes>
            {/* public routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<NotFound />} />

            {/* protected routes with valid authentication and user roles */}
            {/* User routes */}
            <Route element={<ProtectedRoute allowedRoles={["User"]} />}>
              <Route element={<UserLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/work-board/personal" element={<Dashboard />} />
                <Route path="/work-board/projects" element={<Dashboard />} />
                <Route
                  path="/work-board/projects/:projectId"
                  element={<Dashboard />}
                />
                <Route element={<TaskLayout />}>
                  <Route path="/tasks" element={<TaskListView />} />
                  <Route path="/tasks/new" element={<TaskForm />} />
                  <Route path="/tasks/:taskId" element={<TaskForm />} />
                </Route>
                <Route element={<ProjectLayout />}>
                  <Route path="/projects" element={<ProjectListView />} />
                  <Route path="/projects/new" element={<ProjectForm />} />
                  <Route
                    path="/projects/:projectId"
                    element={<ProjectForm />}
                  />
                </Route>
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
