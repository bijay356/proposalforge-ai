"use client";

import { useState } from "react";

export default function Home() {
  const [job, setJob] = useState("");
  const [profile, setProfile] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        🚀 ProposalForge AI
      </h1>

      <textarea
        placeholder="Paste job description..."
        className="w-full p-3 mb-4 rounded bg-gray-800"
        rows={5}
        value={job}
        onChange={(e) => setJob(e.target.value)}
      />

      <textarea
        placeholder="Write your profile (skills, experience)..."
        className="w-full p-3 mb-4 rounded bg-gray-800"
        rows={5}
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      />

      <button
  disabled={loading}
  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
  onClick={async () => {
    try {
      setLoading(true);
      setOutput("");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job, profile }),
      });

      const data = await res.json();
      setOutput(data.proposal);
    } catch (error) {
      setOutput("❌ Error generating proposal");
    } finally {
      setLoading(false);
    }
  }}
>
  {loading ? "⏳ Generating..." : "Generate Proposal"}
</button>

      <div className="mt-6 p-4 bg-gray-800 rounded">
        {output || "Your proposal will appear here..."}
      </div>
    </main>
  );
}