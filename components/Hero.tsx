"use client";

import { useEffect, useState, useRef } from "react";

export default function Hero() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [glitch, setGlitch] = useState(true);
    const titleRef = useRef<HTMLHeadingElement>(null);

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

    return (
        <section
            style={{
                background: "var(--fg)",
                padding: "24px 20px 20px",
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

                {/* Subtitle with blinking cursor */}
                <p
                    style={{
                        fontSize: "clamp(18px, 3vw, 28px)",
                        color: "var(--bg)",
                        margin: "8px 0 0",
                        letterSpacing: "2px",
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
                </p>
            </div>
        </section>
    );
}
