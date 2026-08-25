import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/users/login", {email, password});
      navigate("/notes");
    } catch (err) {
      setError(err.response?.data?.error || "Login Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Log In"}
      </button>

      <p className="mt-5 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-semibold text-violet-600 transition hover:text-violet-500 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;