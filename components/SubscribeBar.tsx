"use client";

import { useState } from "react";

export default function SubscribeBar() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.status === 409) {
                setStatus("duplicate");
            } else if (res.ok) {
                setStatus("success");
            }
        } catch {
            setStatus("idle");
        }
    };

    return (
        <section
            style={{
                background: "var(--fg)",
                padding: "12px 20px",
                position: "relative",
                zIndex: 1,
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 16,
                }}
            >
                {status === "success" ? (
                    <p
                        style={{
                            color: "var(--bg)",
                            fontSize: 24,
                            margin: 0,
                            animation: "pixel-blink 1.5s steps(1) infinite",
                        }}
                    >
                        ✔ YOU&apos;RE IN. WELCOME TO THE GUILD.
                    </p>
                ) : status === "duplicate" ? (
                    <p style={{ color: "var(--bg)", fontSize: 24, margin: 0 }}>
                        ✘ ALREADY A MEMBER.
                    </p>
                ) : (
                    <>
                        <span
                            style={{
                                color: "var(--bg)",
                                fontSize: 22,
                                whiteSpace: "nowrap",
                            }}
                        >
                            GET MORE REPOS LIKE THESE — FOR FREE
                        </span>
                        <form
                            onSubmit={handleSubmit}
                            style={{ display: "flex", gap: 0 }}
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="YOUR@EMAIL.COM"
                                className="pixel-input"
                                style={{
                                    color: "var(--bg)",
                                    borderColor: "var(--bg)",
                                    fontSize: 18,
                                    minWidth: 220,
                                }}
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                style={{
                                    background: "var(--bg)",
                                    color: "var(--fg)",
                                    border: "2px solid var(--bg)",
                                    padding: "8px 20px",
                                    fontSize: 18,
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {status === "loading" ? (
                                    <span style={{ animation: "pixel-blink 0.5s steps(1) infinite" }}>
                                        █ LOADING...
                                    </span>
                                ) : (
                                    "[SUBSCRIBE]"
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}
