import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./utils/axiosClient";  

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyProfle from "./pages/MyProfle";
import ContactInfo from "./pages/ContactInfo";
import AdminPanel from "./pages/AdminPanel";
import ManagerPage from "./pages/ManagerPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { setUserFromStorage } from "./store/auth/authSlice";
import Logout from "./components/Logout";

function App() {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.auth);

  // On app load, populate Redux state from localStorage if available
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedToken && storedRole) {
      dispatch(setUserFromStorage({
        user: JSON.parse(storedUser),
        token: storedToken,
        role: storedRole,
      }));
    }
  }, [dispatch]);

  return (
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* Any logged-in user */}
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/my-profile" element={token ? <MyProfle /> : <Navigate to="/login" />} />
        <Route path="/contact-info" element={token ? <ContactInfo /> : <Navigate to="/login" />} />

        {/* Manager & Admin Only */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <ManagerPage />
            </ProtectedRoute>
          }
        />

        {/* Only admin can access */}
        <Route
          path="/admin-panel"
          element={token && role === "admin" ? <AdminPanel /> : <Navigate to="/login" />}
        />

        {/* Admin + Manager can access */}
        <Route
          path="/manager-panel"
          element={token && (role === "admin" || role === "manager") ? <ManagerPage /> : <Navigate to="/login" />}
        />

        <Route path="/unauthorized" element={<h1>Access Denied</h1>} />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
