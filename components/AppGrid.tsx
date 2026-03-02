"use client";

import { Repo, Category } from "@/db/schema";
import CategoryIcon from "./CategoryIcon";
import AppCard from "./AppCard";
import { useState, useRef } from "react";

interface AppGridProps {
    repos: Repo[];
    categories: Category[];
    user?: any;
    bookmarkedIds?: Set<number>;
    onToggleBookmark?: (id: number) => void;
    activeCategory: string | null;
    onCategoryChange: (slug: string | null) => void;
    onSearch: (query: string) => void;
    showSavedOnly?: boolean;
    onToggleSaved?: () => void;
    loading?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
}

export default function AppGrid({
    repos,
    categories,
    user,
    bookmarkedIds,
    onToggleBookmark,
    activeCategory,
    onCategoryChange,
    onSearch,
    showSavedOnly,
    onToggleSaved,
    loading,
    hasMore,
    onLoadMore,
}: AppGridProps) {
    const [searchValue, setSearchValue] = useState("");
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (val: string) => {
        setSearchValue(val);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => onSearch(val), 350);
    };

    return (
        <section style={{ padding: "24px 20px", position: "relative", zIndex: 1 }}>
            <style>
                {`
                    .filter-pill {
                        background: var(--bg);
                        color: var(--fg);
                        border: 2px solid var(--fg);
                        box-shadow: 3px 3px 0px var(--fg);
                        padding: 6px 14px;
                        font-size: 16px;
                        cursor: pointer;
                        white-space: nowrap;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        flex-shrink: 0;
                        transition: none;
                        text-transform: uppercase;
                    }
                    .filter-pill:hover {
                        transform: translate(1px, 1px);
                        box-shadow: 2px 2px 0px var(--fg);
                    }
                    .filter-pill:active {
                        transform: translate(3px, 3px);
                        box-shadow: none;
                    }
                    .filter-pill.active {
                        background: var(--fg) !important;
                        color: var(--bg) !important;
                        box-shadow: none !important;
                        transform: translate(3px, 3px) !important;
                    }
                    .app-card:hover {
                        transform: translate(2px, 2px);
                        box-shadow: 2px 2px 0px var(--fg) !important;
                    }
                    .self-install-btn:hover {
                        opacity: 0.85;
                    }
                    .app-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 20px;
                        margin-top: 20px;
                    }
                    @media (max-width: 680px) {
                        .app-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}
            </style>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Category Pills */}
                <div
                    style={{
                        display: "flex",
                        gap: 8,
                        overflowX: "auto",
                        paddingBottom: 12,
                        scrollbarWidth: "thin",
                    }}
                >
                    <button
                        onClick={() => onCategoryChange(null)}
                        className={`filter-pill ${activeCategory === null ? "active" : ""}`}
                    >
                        ★ ALL
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() =>
                                onCategoryChange(activeCategory === cat.slug ? null : cat.slug)
                            }
                            className={`filter-pill ${activeCategory === cat.slug ? "active" : ""}`}
                        >
                            <CategoryIcon icon={cat.icon || "grid"} size={14} />
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Search + Saved Toggle */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: 4 }}>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="SEARCH..."
                        className="pixel-input"
                        style={{
                            flex: 1,
                            maxWidth: 400,
                            fontSize: 18,
                        }}
                    />
                    {user && (
                        <button
                            onClick={onToggleSaved}
                            className="pixel-btn"
                            style={{
                                background: showSavedOnly ? "var(--fg)" : "var(--bg)",
                                color: showSavedOnly ? "var(--bg)" : "var(--fg)",
                                border: "2px solid var(--fg)",
                                boxShadow: showSavedOnly ? "none" : "3px 3px 0px var(--fg)",
                                transform: showSavedOnly ? "translate(3px, 3px)" : "none",
                                padding: "6px 16px",
                                fontSize: 16,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                flexShrink: 0,
                            }}
                        >
                            <span>{showSavedOnly ? "★" : "☆"}</span>
                            SAVED
                        </button>
                    )}
                </div>

                {/* Grid of Cards */}
                {repos.length === 0 ? (
                    <div style={{ padding: "60px 20px", textAlign: "center" }}>
                        <p style={{ fontSize: 24, color: "var(--fg)" }}>
                            NO REPOS FOUND. TRY A DIFFERENT SEARCH.
                        </p>
                    </div>
                ) : (
                    <div className="app-grid">
                        {repos.map((repo) => (
                            <AppCard
                                key={repo.id}
                                repo={repo}
                                categories={categories}
                                user={user}
                                isBookmarked={bookmarkedIds?.has(repo.id)}
                                onToggleBookmark={onToggleBookmark}
                            />
                        ))}
                    </div>
                )}

                {/* Load More */}
                {hasMore && (
                    <div style={{ textAlign: "center", marginTop: 32 }}>
                        <button
                            onClick={onLoadMore}
                            disabled={loading}
                            className="pixel-btn"
                            style={{
                                fontSize: 20,
                                padding: "10px 32px",
                            }}
                        >
                            {loading ? "LOADING..." : "[LOAD MORE]"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
