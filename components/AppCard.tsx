"use client";

import { Repo, Category } from "@/db/schema";
import CategoryIcon from "./CategoryIcon";

interface AppCardProps {
    repo: Repo;
    categories: Category[];
    user?: any;
    isBookmarked?: boolean;
    onToggleBookmark?: (id: number) => void;
}

export default function AppCard({
    repo,
    categories,
    user,
    isBookmarked,
    onToggleBookmark,
}: AppCardProps) {
    const cat = categories.find((c) => c.slug === repo.category);
    const catLabel = cat?.label || repo.category;
    const catIcon = cat?.icon || "grid";

    return (
        <div
            className="app-card"
            style={{
                border: "2px solid var(--fg)",
                boxShadow: "4px 4px 0px var(--fg)",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                background: "var(--bg)",
                transition: "transform 0s steps(1), box-shadow 0s steps(1)",
            }}
        >
            {/* Header: Icon + Name + Bookmark */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 16px 8px",
                    borderBottom: "1px solid var(--fg)",
                }}
            >
                {/* App Icon */}
                <div
                    style={{
                        width: 48,
                        height: 48,
                        border: "2px solid var(--fg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: "var(--fg)",
                        color: "var(--bg)",
                    }}
                >
                    <CategoryIcon icon={catIcon} size={24} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                        style={{
                            fontSize: 20,
                            lineHeight: 1.2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: "var(--fg)",
                        }}
                    >
                        {repo.name}
                    </div>
                    <span
                        style={{
                            fontSize: 13,
                            border: "1px solid var(--fg)",
                            padding: "1px 6px",
                            display: "inline-block",
                            marginTop: 4,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            opacity: 0.8,
                        }}
                    >
                        {catLabel}
                    </span>
                </div>

                {/* Bookmark */}
                {user && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark?.(repo.id);
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            color: "var(--fg)",
                            fontSize: 22,
                            cursor: "pointer",
                            padding: 4,
                            lineHeight: 1,
                            flexShrink: 0,
                        }}
                        title={isBookmarked ? "REMOVE FROM SAVED" : "SAVE FOR LATER"}
                    >
                        {isBookmarked ? "★" : "☆"}
                    </button>
                )}
            </div>

            {/* Description */}
            <div
                style={{
                    padding: "12px 16px",
                    flex: 1,
                    fontSize: 16,
                    lineHeight: 1.4,
                    color: "var(--fg)",
                    opacity: 0.75,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                }}
            >
                {repo.description || "No description available."}
            </div>

            {/* Stars */}
            {repo.stars > 0 && (
                <div
                    style={{
                        padding: "0 16px 8px",
                        fontSize: 14,
                        color: "var(--fg)",
                        opacity: 0.6,
                        letterSpacing: 1,
                    }}
                >
                    ★ {repo.stars >= 1000 ? `${(repo.stars / 1000).toFixed(1)}K` : repo.stars}
                </div>
            )}

            {/* Action Buttons */}
            <div
                style={{
                    display: "flex",
                    borderTop: "2px solid var(--fg)",
                }}
            >
                {/* Install (Coming Soon) */}
                <button
                    disabled
                    title="COMING SOON"
                    style={{
                        flex: 1,
                        padding: "10px 12px",
                        fontSize: 16,
                        letterSpacing: 1,
                        cursor: "not-allowed",
                        border: "none",
                        borderRight: "1px solid var(--fg)",
                        background: "var(--bg)",
                        color: "var(--fg)",
                        opacity: 0.35,
                        textTransform: "uppercase",
                        position: "relative",
                    }}
                >
                    [INSTALL]
                    <span
                        style={{
                            position: "absolute",
                            top: 2,
                            right: 4,
                            fontSize: 9,
                            letterSpacing: 0.5,
                            opacity: 0.9,
                        }}
                    >
                        COMING SOON
                    </span>
                </button>

                {/* Self Install → GitHub */}
                <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-install-btn"
                    style={{
                        flex: 1,
                        padding: "10px 12px",
                        fontSize: 16,
                        letterSpacing: 1,
                        cursor: "pointer",
                        border: "none",
                        background: "var(--fg)",
                        color: "var(--bg)",
                        textDecoration: "none",
                        textAlign: "center",
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                    }}
                >
                    ↗ SELF INSTALL
                </a>
            </div>
        </div>
    );
}
