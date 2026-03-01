"use client";

import { useEffect, useState, useRef } from "react";
import AuthModal from "./AuthModal";

export default function Hero() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [glitch, setGlitch] = useState(true);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [email, setEmail] = useState("");
    const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "duplicate">("idle");
    const [user, setUser] = useState<any>(null);
    const [showAuth, setShowAuth] = useState<"login" | "signup" | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) {
            setTheme(saved);
            document.documentElement.setAttribute("data-theme", saved);
        }

        // Glitch animation on mount
        const timer = setTimeout(() => setGlitch(false), 300);

        // Check user session
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.user) setUser(data.user);
            })
            .catch(() => {});

        return () => clearTimeout(timer);
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            setUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

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
                {/* Top Actions: Auth + Theme */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        display: "flex",
                        gap: 8,
                        zIndex: 10,
                        flexWrap: "wrap",
                        justifyContent: "flex-end"
                    }}
                >
                    {user ? (
                        <>
                            <span style={{ color: "var(--bg)", fontSize: 14, alignSelf: "center", textTransform: "uppercase" }}>
                                HELLO, {user.username}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="pixel-btn"
                                style={{
                                    background: "var(--bg)",
                                    color: "var(--fg)",
                                    border: "2px solid var(--bg)",
                                    boxShadow: "4px 4px 0px var(--bg)",
                                    fontSize: 14,
                                    padding: "4px 12px",
                                }}
                            >
                                [LOGOUT]
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setShowAuth("login")}
                                className="pixel-btn"
                                style={{
                                    background: "var(--bg)",
                                    color: "var(--fg)",
                                    border: "2px solid var(--bg)",
                                    boxShadow: "4px 4px 0px var(--bg)",
                                    fontSize: 14,
                                    padding: "4px 12px",
                                }}
                            >
                                [LOGIN]
                            </button>
                            <button
                                onClick={() => setShowAuth("signup")}
                                className="pixel-btn"
                                style={{
                                    background: "var(--bg)",
                                    color: "var(--fg)",
                                    border: "2px solid var(--bg)",
                                    boxShadow: "4px 4px 0px var(--bg)",
                                    fontSize: 14,
                                    padding: "4px 12px",
                                }}
                            >
                                [SIGNUP]
                            </button>
                        </>
                    )}
                    <button
                        onClick={toggleTheme}
                        className="pixel-btn"
                        style={{
                            background: "var(--bg)",
                            color: "var(--fg)",
                            border: "2px solid var(--bg)",
                            boxShadow: "4px 4px 0px var(--bg)",
                            fontSize: 14,
                            padding: "4px 12px",
                        }}
                    >
                        [{theme === "light" ? "DARK" : "LIGHT"}]
                    </button>
                </div>

                {/* Title + Versily Badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        flexWrap: "wrap",
                    }}
                >
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
                    <a
                        href="https://versily.com/products/repoforthat?utm_source=versily&utm_medium=badge&utm_campaign=featured"
                        target="_blank"
                        rel="noopener"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <img
                            src={`https://amujqvxlqnrslaqiozkw.supabase.co/functions/v1/badge-svg?theme=${theme}&width=210&height=45&id=ef3e8a08-a435-4ff3-8b39-0c4639ecea5f`}
                            width="210"
                            height="45"
                            alt="Featured on Versily - repo for that"
                            loading="lazy"
                            decoding="async"
                            style={{
                                height: "auto",
                                aspectRatio: "210/45",
                            }}
                        />
                    </a>
                    <a
                        href="https://acidtools.com"
                        target="_blank"
                        rel="noopener"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <img
                            src="https://acidtools.com/assets/images/badge.png"
                            height="54"
                            alt="Acid Tools"
                            loading="lazy"
                            decoding="async"
                            style={{ height: 45 }}
                        />
                    </a>
                </div>

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
                                    GET UPDATES AND LOT MORE
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
                                            cursor: "pointer",
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

            {/* Auth Modal Rendering */}
            {showAuth && (
                <AuthModal
                    type={showAuth}
                    onClose={() => setShowAuth(null)}
                    onSuccess={(userData) => setUser(userData)}
                />
            )}
        </section>
    );
}
