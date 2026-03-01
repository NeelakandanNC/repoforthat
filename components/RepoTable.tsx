"use client";

import { Repo, Category } from "@/db/schema";
import CategoryIcon from "./CategoryIcon";
import { useState } from "react";

interface RepoTableProps {
    repos: Repo[];
    categories: Category[];
    user?: any;
    bookmarkedIds?: Set<number>;
    onToggleBookmark?: (id: number) => void;
}

export default function RepoTable({
    repos,
    categories,
    user,
    bookmarkedIds,
    onToggleBookmark,
}: RepoTableProps) {
    const getCategoryIcon = (categorySlug: string): string => {
        const cat = categories.find((c) => c.slug === categorySlug);
        return cat?.icon || "grid";
    };

    const getCategoryLabel = (categorySlug: string): string => {
        const cat = categories.find((c) => c.slug === categorySlug);
        return cat?.label || categorySlug;
    };

    if (repos.length === 0) {
        return (
            <section style={{ padding: "40px 20px", textAlign: "center", position: "relative", zIndex: 1 }}>
                <p style={{ fontSize: 24, color: "var(--fg)" }}>
                    NO REPOS FOUND. TRY A DIFFERENT SEARCH.
                </p>
            </section>
        );
    }

    return (
        <section style={{ padding: "0 20px", position: "relative", zIndex: 1 }}>
            <style>
                {`
                    .repo-row {
                        background: transparent;
                        color: var(--fg);
                        border-bottom: 1px solid var(--fg);
                        cursor: pointer;
                        transition: none;
                    }
                    .repo-row:hover {
                        background: var(--fg) !important;
                        color: var(--bg) !important;
                    }
                    .repo-row:hover a {
                        color: inherit !important;
                        text-decoration: underline !important;
                    }
                    .repo-row:hover .category-badge {
                        border-color: var(--bg) !important;
                    }
                    .repo-row .arrow {
                        display: none;
                        margin-right: 4px;
                    }
                    .repo-row:hover .arrow {
                        display: inline;
                    }
                `}
            </style>
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    overflowX: "auto",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "2px solid var(--fg)",
                        fontSize: 18,
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                background: "var(--fg)",
                                color: "var(--bg)",
                            }}
                        >
                            <th style={thStyle}>#</th>
                            <th style={{ ...thStyle, width: 30 }}></th>
                            <th style={{ ...thStyle, textAlign: "left" }}>NAME</th>
                            <th style={{ ...thStyle, textAlign: "left" }}>DESCRIPTION</th>
                            <th style={thStyle}>CATEGORY</th>
                            {user && <th style={thStyle}>SAVED</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {repos.map((repo, idx) => {
                            return (
                                <tr
                                    key={repo.id}
                                    className="repo-row"
                                >
                                    <td style={tdStyle}>
                                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                            <span className="arrow">▶</span>
                                            {idx + 1}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <CategoryIcon
                                            icon={getCategoryIcon(repo.category)}
                                            size={16}
                                        />
                                    </td>
                                    <td style={{ ...tdStyle, fontWeight: 400 }}>
                                        <a
                                            href={repo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: "inherit",
                                                textDecoration: "none",
                                                fontSize: 20,
                                            }}
                                        >
                                            {repo.name}
                                        </a>
                                    </td>
                                    <td
                                        style={{
                                            ...tdStyle,
                                            maxWidth: 300,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            fontSize: 16,
                                            opacity: 0.8,
                                        }}
                                    >
                                        {repo.description || "—"}
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: "center" }}>
                                        <span
                                            className="category-badge"
                                            style={{
                                                border: "1px solid var(--fg)",
                                                padding: "2px 8px",
                                                fontSize: 14,
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {getCategoryLabel(repo.category).toUpperCase()}
                                        </span>
                                    </td>
                                    {user && (
                                        <td style={{ ...tdStyle, textAlign: "center" }}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onToggleBookmark?.(repo.id);
                                                }}
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    color: "inherit",
                                                    fontSize: 24,
                                                    cursor: "pointer",
                                                    padding: "0 8px",
                                                    lineHeight: 1,
                                                }}
                                                title={bookmarkedIds?.has(repo.id) ? "REMOVE FROM SAVED" : "SAVE FOR LATER"}
                                            >
                                                {bookmarkedIds?.has(repo.id) ? "★" : "☆"}
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

const thStyle: React.CSSProperties = {
    padding: "10px 12px",
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 1,
    whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
    padding: "10px 12px",
    verticalAlign: "middle",
};
