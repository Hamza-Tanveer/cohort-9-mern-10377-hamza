import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const NoteForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const note = location.state?.note;
  const isEditing = Boolean(id);
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [isPinned, setIsPinned] = useState(note?.isPinned || false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = { title, content, isPinned };
      if (isEditing) {
        await api.patch(`/notes/${id}`, payload);
      } else {
        await api.post("/notes", payload);
      }
      navigate("/notes");
    } catch {
      setError(isEditing ? "Could not update note." : "Could not create note.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">
          {isEditing ? "Edit Note" : "Create Note"}
        </h1>
        {error && <p className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <label className="mb-4 block text-sm font-medium text-slate-700">
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            maxLength={100}
            className="mt-1 w-full rounded border border-slate-300 p-2"
          />
        </label>
        <label className="mb-4 block text-sm font-medium text-slate-700">
          Content
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
            rows={8}
            className="mt-1 w-full rounded border border-slate-300 p-2"
          />
        </label>
        <label className="mb-6 flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={isPinned} onChange={(event) => setIsPinned(event.target.checked)} />
          Pinned
        </label>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => navigate("/notes")} className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">
            {saving ? "Saving..." : "Save Note"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default NoteForm;