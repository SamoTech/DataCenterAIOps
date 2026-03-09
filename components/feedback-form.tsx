"use client";

import { FormEvent, useMemo, useState } from "react";

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

const ratings = [1, 2, 3, 4, 5];

export function FeedbackForm() {
  const [rating, setRating] = useState(4);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<SubmitState>({ type: "idle", message: "" });

  const ctaLabel = useMemo(() => {
    if (loading) return "Submitting...";
    return "Submit feedback";
  }, [loading]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setState({ type: "idle", message: "" });

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      role: String(form.get("role") || "").trim(),
      teamSize: String(form.get("teamSize") || "").trim(),
      message: String(form.get("message") || "").trim(),
      rating
    };

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send feedback right now.");
      }

      setState({
        type: "success",
        message: result.message || "Thanks — your feedback was received."
      });
      event.currentTarget.reset();
      setRating(4);
    } catch (error) {
      setState({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="feedback-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" placeholder="Your name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          <span>Role</span>
          <input name="role" placeholder="DevOps Engineer" required />
        </label>
        <label>
          <span>Team size</span>
          <input name="teamSize" placeholder="1-10" />
        </label>
      </div>

      <div className="rating-block">
        <span>How valuable is this idea for your team?</span>
        <div className="rating-row">
          {ratings.map((value) => (
            <button
              key={value}
              className={value <= rating ? "rating-chip active" : "rating-chip"}
              onClick={(event) => {
                event.preventDefault();
                setRating(value);
              }}
              type="button"
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <label>
        <span>What should we build next?</span>
        <textarea
          name="message"
          placeholder="Tell us what would make this useful in real operations..."
          rows={5}
          required
        />
      </label>

      <div className="form-actions">
        <button className="primary-btn" disabled={loading} type="submit">
          {ctaLabel}
        </button>
        <p className="form-note">Best for early feedback before full public rollout.</p>
      </div>

      {state.type !== "idle" ? (
        <div className={state.type === "success" ? "form-state success" : "form-state error"}>{state.message}</div>
      ) : null}
    </form>
  );
}
