"use client";

import { Category } from "@/db/schema";
import CategoryIcon from "./CategoryIcon";
import { useState, useRef } from "react";

interface FilterBarProps {
    categories: Category[];
    activeCategory: string | null;
    onCategoryChange: (slug: string | null) => void;
    onSearch: (query: string) => void;
}

export default function FilterBar({
    categories,
    activeCategory,
    onCategoryChange,
    onSearch,
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
                        style={{
                            background: activeCategory === null ? "var(--fg)" : "var(--bg)",
                            color: activeCategory === null ? "var(--bg)" : "var(--fg)",
                            border: "2px solid var(--fg)",
                            boxShadow: activeCategory === null ? "none" : "3px 3px 0px var(--fg)",
                            transform: activeCategory === null ? "translate(3px, 3px)" : "none",
                            padding: "6px 14px",
                            fontSize: 16,
                            cursor: "crosshair",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            flexShrink: 0,
                        }}
                    >
                        ★ ALL
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() =>
                                onCategoryChange(activeCategory === cat.slug ? null : cat.slug)
                            }
                            style={{
                                background:
                                    activeCategory === cat.slug ? "var(--fg)" : "var(--bg)",
                                color:
                                    activeCategory === cat.slug ? "var(--bg)" : "var(--fg)",
                                border: "2px solid var(--fg)",
                                boxShadow:
                                    activeCategory === cat.slug
                                        ? "none"
                                        : "3px 3px 0px var(--fg)",
                                transform:
                                    activeCategory === cat.slug
                                        ? "translate(3px, 3px)"
                                        : "none",
                                padding: "6px 14px",
                                fontSize: 16,
                                cursor: "crosshair",
                                whiteSpace: "nowrap",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                flexShrink: 0,
                            }}
                        >
                            <CategoryIcon icon={cat.icon || "grid"} size={14} />
                            {cat.label.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div style={{ marginTop: 12 }}>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="SEARCH REPOS..."
                        className="pixel-input"
                        style={{
                            width: "100%",
                            maxWidth: 400,
                            fontSize: 18,
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
