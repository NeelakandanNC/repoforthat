"use client";

interface TabBarProps {
    activeTab: "foss" | "agent";
    onTabChange: (tab: "foss" | "agent") => void;
    fossCount?: number;
    agentCount?: number;
}

export default function TabBar({ activeTab, onTabChange, fossCount, agentCount }: TabBarProps) {
    return (
        <div
            style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "0 20px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    borderBottom: "3px solid var(--fg)",
                }}
            >
                <button
                    onClick={() => onTabChange("foss")}
                    style={{
                        flex: 1,
                        padding: "14px 24px",
                        fontSize: 22,
                        letterSpacing: 2,
                        cursor: "pointer",
                        border: "2px solid var(--fg)",
                        borderBottom: activeTab === "foss" ? "3px solid var(--bg)" : "2px solid var(--fg)",
                        marginBottom: activeTab === "foss" ? -3 : 0,
                        background: activeTab === "foss" ? "var(--fg)" : "var(--bg)",
                        color: activeTab === "foss" ? "var(--bg)" : "var(--fg)",
                        position: "relative",
                        zIndex: activeTab === "foss" ? 2 : 1,
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h4" /></svg>
                    FOSS
                    {fossCount !== undefined && (
                        <span
                            style={{
                                fontSize: 14,
                                opacity: 0.7,
                                border: `1px solid ${activeTab === "foss" ? "var(--bg)" : "var(--fg)"}`,
                                padding: "2px 8px",
                            }}
                        >
                            {fossCount}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => onTabChange("agent")}
                    style={{
                        flex: 1,
                        padding: "14px 24px",
                        fontSize: 22,
                        letterSpacing: 2,
                        cursor: "pointer",
                        border: "2px solid var(--fg)",
                        borderBottom: activeTab === "agent" ? "3px solid var(--bg)" : "2px solid var(--fg)",
                        marginBottom: activeTab === "agent" ? -3 : 0,
                        background: activeTab === "agent" ? "var(--fg)" : "var(--bg)",
                        color: activeTab === "agent" ? "var(--bg)" : "var(--fg)",
                        position: "relative",
                        zIndex: activeTab === "agent" ? 2 : 1,
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"><rect x="4" y="8" width="16" height="12" /><line x1="12" y1="2" x2="12" y2="8" /><circle cx="9" cy="14" r="1.5" fill="currentColor" /><circle cx="15" cy="14" r="1.5" fill="currentColor" /><line x1="2" y1="13" x2="4" y2="13" /><line x1="20" y1="13" x2="22" y2="13" /></svg>
                    AGENTS & SKILLS
                    {agentCount !== undefined && (
                        <span
                            style={{
                                fontSize: 14,
                                opacity: 0.7,
                                border: `1px solid ${activeTab === "agent" ? "var(--bg)" : "var(--fg)"}`,
                                padding: "2px 8px",
                            }}
                        >
                            {agentCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
