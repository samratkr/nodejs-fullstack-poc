import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Header from "../components/Header";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const Navigation: React.FC = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  const renderWithHeader = (Component: React.ReactNode) => (
    <>
      {token && user && <Header />}
      {Component}
    </>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/dashboard" replace /> : <SignUp />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>{renderWithHeader(<Dashboard />)}</ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>{renderWithHeader(<Profile />)}</ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
};

export default Navigation;
