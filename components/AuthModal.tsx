"use client";

import { useState } from "react";

interface AuthModalProps {
    type: "login" | "signup";
    onClose: () => void;
    onSuccess: (user: any) => void;
}

export default function AuthModal({ type: initialType, onClose, onSuccess }: AuthModalProps) {
    const [type, setType] = useState<"login" | "signup">(initialType);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const url = type === "signup" ? "/api/auth/signup" : "/api/auth/login";
            const body = type === "signup"
                ? { email, password, username }
                : { identifier: email || username, password }; // Login uses email or username as identifier

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
            } else {
                onSuccess(data.user);
                onClose();
            }
        } catch (err) {
            setError("Failed to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100,
                padding: 20,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "var(--bg)",
                    border: "4px solid var(--fg)",
                    boxShadow: "8px 8px 0px var(--fg)",
                    width: "100%",
                    maxWidth: 400,
                    padding: 24,
                    position: "relative",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "none",
                        border: "none",
                        fontSize: 24,
                        color: "var(--fg)",
                        cursor: "pointer",

                    }}
                >
                    [X]
                </button>

                <h2 style={{ fontSize: 32, margin: "0 0 24px", textAlign: "center", textTransform: "uppercase" }}>
                    {type === "signup" ? "Create Account" : "Access Granted?"}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {type === "signup" && (
                        <input
                            type="text"
                            placeholder="USERNAME"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toUpperCase())}
                            className="pixel-input"
                            required
                            style={{ color: "var(--fg)" }}
                        />
                    )}
                    <input
                        type={type === "signup" ? "email" : "text"}
                        placeholder={type === "signup" ? "EMAIL@DOMAIN.COM" : "EMAIL OR USERNAME"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pixel-input"
                        required
                        style={{ color: "var(--fg)" }}
                    />
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pixel-input"
                        required
                        style={{ color: "var(--fg)" }}
                    />

                    {error && (
                        <div style={{ color: "red", fontSize: 14, textAlign: "center" }}>
                            ERROR: {error.toUpperCase()}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="pixel-btn"
                        style={{ marginTop: 8 }}
                    >
                        {loading ? "PROCESSING..." : `[${type.toUpperCase()}]`}
                    </button>
                </form>

                <div style={{ marginTop: 16, textAlign: "center", fontSize: 14 }}>
                    {type === "signup" ? (
                        <>
                            ALREADY HAVE AN ACCOUNT?{" "}
                            <span
                                style={{ textDecoration: "underline", cursor: "pointer" }}
                                onClick={() => { setType("login"); setError(""); }}
                            >
                                LOGIN
                            </span>
                        </>
                    ) : (
                        <>
                            NEW HERE?{" "}
                            <span
                                style={{ textDecoration: "underline", cursor: "pointer" }}
                                onClick={() => { setType("signup"); setError(""); }}
                            >
                                SIGNUP
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
