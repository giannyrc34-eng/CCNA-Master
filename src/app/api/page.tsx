"use client";

import { useState } from "react";

export default function AIPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    const data = await response.json();

    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div className="p-10">
      <h1 className="mb-6 text-4xl font-bold">
        CCNA AI Tutor
      </h1>

      <textarea
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Ask a networking question..."
        className="w-full rounded border p-4"
        rows={5}
      />

      <button
        onClick={askAI}
        className="mt-4 rounded bg-blue-600 px-6 py-3 text-white"
      >
        Ask AI
      </button>

      {loading && (
        <p className="mt-4">
          Thinking...
        </p>
      )}

      {reply && (
        <div className="mt-6 rounded border p-6">
          <h2 className="mb-2 text-xl font-bold">
            AI Response
          </h2>

          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}