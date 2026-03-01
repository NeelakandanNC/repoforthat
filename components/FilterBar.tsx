"use client";

import { Category } from "@/db/schema";
import CategoryIcon from "./CategoryIcon";
import { useState, useRef } from "react";

interface FilterBarProps {
    categories: Category[];
    activeCategory: string | null;
    onCategoryChange: (slug: string | null) => void;
    onSearch: (query: string) => void;
    user?: any;
    showSavedOnly?: boolean;
    onToggleSaved?: () => void;
}

export default function FilterBar({
    categories,
    activeCategory,
    onCategoryChange,
    onSearch,
    user,
    showSavedOnly,
    onToggleSaved,
}: FilterBarProps) {
    const [searchValue, setSearchValue] = useState("");
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (val: string) => {
        setSearchValue(val);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => onSearch(val), 350);
    };

    return (
        <section
            style={{
                padding: "24px 20px",
                position: "relative",
                zIndex: 1,
            }}
        >
            <style>
                {`
                    .filter-btn {
                        background: var(--bg);
                        color: var(--fg);
                        border: 2px solid var(--fg);
                        box-shadow: 3px 3px 0px var(--fg);
                        padding: 6px 14px;
                        font-size: 16;
                        cursor: pointer;
                        white-space: nowrap;
                        display: flex;
                        align-items: center;
                        gap: 6;
                        flex-shrink: 0;
                        transition: none;
                        text-transform: uppercase;
                    }
                    .filter-btn:hover {
                        transform: translate(1px, 1px);
                        box-shadow: 2px 2px 0px var(--fg);
                    }
                    .filter-btn:active {
                        transform: translate(3px, 3px);
                        box-shadow: none;
                    }
                    .filter-btn.active {
                        background: var(--fg) !important;
                        color: var(--bg) !important;
                        box-shadow: none !important;
                        transform: translate(3px, 3px) !important;
                    }
                `}
            </style>
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                }}
            >
                {/* Category Badges */}
                <div
                    style={{
                        display: "flex",
                        gap: 8,
                        overflowX: "auto",
                        paddingBottom: 12,
                        scrollbarWidth: "thin",
                    }}
                >
                    {/* ALL button */}
                    <button
                        onClick={() => onCategoryChange(null)}
                        className={`filter-btn ${activeCategory === null ? "active" : ""}`}
                    >
                        ★ ALL
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() =>
                                onCategoryChange(activeCategory === cat.slug ? null : cat.slug)
                            }
                            className={`filter-btn ${activeCategory === cat.slug ? "active" : ""}`}
                        >
                            <CategoryIcon icon={cat.icon || "grid"} size={14} />
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Search Input + Saved Toggle */}
                <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="SEARCH REPOS..."
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
            </div>
        </section>
    );
}
