import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import api from "../api/axios";

const NoteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start writing your note here...",
      height: 350,
      showStatusbar: false,
      buttons: ["bold", "italic", "underline", "|", "ul", "ol", "|", "font", "fontsize", "|", "link", "undo", "redo"],
    }),
    []
  );

  useEffect(() => {
    if (!id) return undefined;

    const controller = new AbortController();
    let isActive = true;
    setLoading(true);
    setError("");

    const fetchNote = async () => {
      try {
        const { data } = await api.get(`/notes/${id}`, { signal: controller.signal });
        if (!isActive) return;
        setTitle(data.title || "");
        setContent(data.content || "");
      } catch {
        if (!isActive) return;
        setError("Could not load note.");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchNote();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (id) {
        await api.put(`/notes/${id}`, { title, content });
      } else {
        await api.post("/notes", { title, content });
      }
      navigate("/notes");
    } catch {
      setError(id ? "Could not update note." : "Could not create note.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <main className="min-h-screen bg-slate-100 p-6 text-slate-500">Loading note...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">
          {id ? "Edit Note" : "Create Note"}
        </h1>
        {error && <p className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <label htmlFor="note-title" className="mb-4 block text-sm font-medium text-slate-700">
          Title
          <input
            id="note-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            maxLength={100}
            className="mt-1 w-full rounded border border-slate-300 p-2"
          />
        </label>
        <div className="mb-6 text-sm font-medium text-slate-700">
          <label htmlFor="note-content" className="mb-1 block">Content</label>
          <div id="note-content">
            <JoditEditor ref={editor} value={content} config={config} onBlur={(newContent) => setContent(newContent)} />
          </div>
        </div>
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