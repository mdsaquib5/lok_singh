"use client";

import { useState } from "react";
import Link from "next/link";
import { BsArrowLeft, BsBroadcast, BsJournalCheck, BsPeople } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import "./launching.css";

export default function LaunchingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    // You can connect this to a real endpoint if needed in the future
  };

  return (
    <div className="launching-wrapper">
      {/* Background ambient light blobs */}
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>
      <div className="glow-blob blob-3"></div>

      {/* Main Glassmorphic Container */}
      <div className="glass-card">
        {/* Pulsing Badge */}
        <div className="soon-badge">
          <span className="pulse-dot"></span>
          Launching Soon
        </div>

        {/* Heading */}
        <h1 className="launching-title">
          Uncovering the Future of Journalism
        </h1>

        {/* Description */}
        <p className="launching-desc">
          We are building a ground-breaking space for independent investigative stories, 
          unfiltered field reporting, and raw documentaries. Something extraordinary is in the works.
        </p>

        {/* Feature Context Grid */}
        <div className="context-box">
          <div className="context-item">
            <BsBroadcast className="context-icon" style={{ color: "#f43f5e" }} />
            <h4>Live Media</h4>
            <p>Real-time field reporting and direct stories.</p>
          </div>
          <div className="context-item">
            <BsJournalCheck className="context-icon" style={{ color: "#fbbf24" }} />
            <h4>Deep Insights</h4>
            <p>Rigorous, data-backed investigative dossiers.</p>
          </div>
          <div className="context-item">
            <BsPeople className="context-icon" style={{ color: "#3b82f6" }} />
            <h4>Creator Network</h4>
            <p>A collaborative hub for independent storytellers.</p>
          </div>
        </div>

        {/* Form or Success State */}
        {!submitted ? (
          <form className="notify-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to get notified..."
              className="notify-input"
              required
            />
            <button type="submit" className="notify-button">
              Get Notified
            </button>
          </form>
        ) : (
          <div className="success-msg">
            <FiCheckCircle style={{ fontSize: "1.2rem" }} />
            Awesome! We'll keep you posted.
          </div>
        )}

        {error && <p style={{ color: "#f43f5e", fontSize: "0.85rem", margin: "0" }}>{error}</p>}

        {/* Home Navigation */}
        <Link href="/" className="back-home-link">
          <BsArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  );
}
