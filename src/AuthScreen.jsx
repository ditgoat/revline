import React, { useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-[#0c0d0e] px-6">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');`}</style>
      <div className="w-full max-w-sm">
        <h1 className="tracking-[0.2em] text-3xl text-white text-center mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>
          REVLINE
        </h1>
        <p className="text-center text-[#8a8d93] mb-8" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em" }}>
          CAR ENTHUSIAST COMMUNITY
        </p>

        {sent ? (
          <div className="text-center">
            <p className="text-sm text-[#C9CDD3]" style={{ fontFamily: "Inter, sans-serif" }}>
              Check your email — tap the link we sent to finish signing in.
            </p>
          </div>
        ) : (
          <>
            <label className="text-[#8a8d93]" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em" }}>
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-1 mb-3 bg-[#1c1d20] border border-[#2A2C30] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#5a5d63] outline-none focus:border-[#F2C245]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            {error && (
              <p className="text-[#E4572E] mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
                {error}
              </p>
            )}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full tracking-[0.15em] text-sm bg-[#F2C245] text-[#17181a] py-3 rounded-lg active:scale-95 transition-transform disabled:opacity-50"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              {loading ? "SENDING..." : "SEND SIGN-IN LINK"}
            </button>
            <p className="mt-6 text-center break-all" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#5a5d63" }}>
              DEBUG URL: {String(import.meta.env.VITE_SUPABASE_URL)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
