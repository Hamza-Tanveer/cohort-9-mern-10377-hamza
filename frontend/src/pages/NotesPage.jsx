import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotesPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("/users/logout");
    navigate("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl">
        <h1 className="text-2xl font-semibold text-slate-900">You are signed in</h1>
        <p className="mt-2 text-sm text-slate-500">
          Notes functionality is not available from the backend yet.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Log out
        </button>
      </section>
    </main>
  );
};

export default NotesPage;
