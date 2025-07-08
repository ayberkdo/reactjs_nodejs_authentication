import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuthStore } from "./store/authStore";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <RegisterPage />
                )
              }
            />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Redirect root to appropriate page */}
            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
