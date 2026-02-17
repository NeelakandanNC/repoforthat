"use client";

import { useEffect, useState, useRef } from "react";

export default function Hero() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [glitch, setGlitch] = useState(true);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [email, setEmail] = useState("");
    const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "duplicate">("idle");

    useEffect(() => {
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) {
            setTheme(saved);
            document.documentElement.setAttribute("data-theme", saved);
        }
    }, []);

    useEffect(() => {
        // Glitch animation on mount — runs for 300ms then stops
        const timer = setTimeout(() => setGlitch(false), 300);
        return () => clearTimeout(timer);
    }, []);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.setAttribute("data-theme", next);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setSubStatus("loading");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.status === 409) {
                setSubStatus("duplicate");
            } else if (res.ok) {
                setSubStatus("success");
            }
        } catch {
            setSubStatus("idle");
        }
    };

    return (
        <section
            style={{
                background: "var(--fg)",
                padding: "16px 20px 12px",
                position: "relative",
                overflow: "visible",
            }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="pixel-btn"
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "var(--bg)",
                        color: "var(--fg)",
                        border: "2px solid var(--bg)",
                        boxShadow: "4px 4px 0px var(--bg)",
                        fontSize: 14,
                        padding: "4px 12px",
                        zIndex: 10,
                    }}
                >
                    [{theme === "light" ? "DARK" : "LIGHT"}]
                </button>

                {/* Title */}
                <h1
                    ref={titleRef}
                    style={{
                        fontSize: "clamp(40px, 7vw, 72px)",
                        color: "var(--bg)",
                        lineHeight: 1,
                        margin: 0,
                        letterSpacing: "4px",
                        animation: glitch ? "pixel-glitch 0.05s steps(4) 6" : "none",
                    }}
                >
                    REPO FOR THAT
                </h1>

                {/* Subtitle + Subscribe — same line */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 16,
                        marginTop: 4,
                    }}
                >
                    <span
                        style={{
                            fontSize: "clamp(14px, 2vw, 18px)",
                            color: "var(--bg)",
                            letterSpacing: "2px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        OPEN SOURCE, ORGANIZED.
                        <span
                            style={{
                                animation: "pixel-blink 1s steps(1) infinite",
                                marginLeft: 4,
                            }}
                        >
                            █
                        </span>
                    </span>

                    {/* Subscribe inline */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
                        {subStatus === "success" ? (
                            <span
                                style={{
                                    color: "var(--bg)",
                                    fontSize: 16,
                                    animation: "pixel-blink 1.5s steps(1) infinite",
                                }}
                            >
                                ✔ YOU&apos;RE IN!
                            </span>
                        ) : subStatus === "duplicate" ? (
                            <span style={{ color: "var(--bg)", fontSize: 16 }}>
                                ✘ ALREADY SUBSCRIBED
                            </span>
                        ) : (
                            <>
                                <span
                                    style={{
                                        color: "var(--bg)",
                                        fontSize: "clamp(14px, 2vw, 16px)",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    GET REPOS — FREE
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
                                            fontSize: 14,
                                            padding: "4px 8px",
                                            minWidth: 160,
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={subStatus === "loading"}
                                        style={{
                                            background: "var(--bg)",
                                            color: "var(--fg)",
                                            border: "2px solid var(--bg)",
                                            padding: "4px 12px",
                                            fontSize: 14,
                                            cursor: "crosshair",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {subStatus === "loading" ? "..." : "[SUBSCRIBE]"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
