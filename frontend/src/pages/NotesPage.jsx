import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const NotesPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await api.get("/notes");
        setNotes(data);
      } catch (err) {
        setError("Could not load notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      setError("Could not delete note.");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      navigate("/login");
    } catch (err) {
      setError("Could not log out.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">All Notes</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/notes/new")}
              className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 text-sm font-medium"
            >
              + Create Note
            </button>
            <button
              onClick={handleLogout}
              className="border border-slate-300 bg-white px-4 py-2 rounded text-slate-700 hover:bg-slate-50 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded text-sm">
            {error}
          </div>
        )}

        {/* Content Area */}
        {loading ? (
          <p className="text-slate-500">Loading notes...</p>
        ) : notes.length === 0 ? (
          <div className="bg-white p-8 text-center rounded border border-dashed text-slate-500">
            No notes found. Click "+ Create Note" to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div key={note._id} className="bg-white p-4 rounded shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-lg text-slate-800">{note.title}</h2>
                  <p className="text-slate-600 text-sm mt-1 line-clamp-3">{note.content}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/notes/edit/${note._id}`)}
                    className="text-sm px-3 py-1 border rounded text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-sm px-3 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default NotesPage;