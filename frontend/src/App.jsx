import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotesPage from "./pages/NotesPage";
import NoteForm from "./components/NoteForm";
import api from "./api/axios";

function ProtectedRoutes() {
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await api.get("/users/me");
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkLogin();
  }, []);

  if (isChecking) {
    return <main className="min-h-screen bg-slate-100 p-6 text-slate-500">Checking session...</main>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/new" element={<NoteForm />} />
          <Route path="/notes/edit/:id" element={<NoteForm />} />
        </Route>
        
        
        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}