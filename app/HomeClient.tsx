"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Repo, Category } from "@/db/schema";
import Hero from "@/components/Hero";

import FilterBar from "@/components/FilterBar";
import RepoTable from "@/components/RepoTable";
import LoadMoreButton from "@/components/LoadMoreButton";

interface HomeClientProps {
    initialRepos: Repo[];
    categories: Category[];
    totalRepos: number;
}

export default function HomeClient({
    initialRepos,
    categories,
    totalRepos,
}: HomeClientProps) {
    const [reposList, setReposList] = useState<Repo[]>(initialRepos);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialRepos.length < totalRepos);
    const [loading, setLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState<any>(null);
    const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());
    const [showSavedOnly, setShowSavedOnly] = useState(false);

    // Fetch user session on mount
    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                }
            })
            .catch(() => {});
    }, []);

    // Fetch bookmarks when user changes
    useEffect(() => {
        if (user) {
            fetch("/api/bookmarks")
                .then(res => res.json())
                .then(bookmarkData => {
                    if (bookmarkData.bookmarks) {
                        setBookmarkedIds(new Set(bookmarkData.bookmarks.map((b: any) => b.repoId)));
                    }
                })
                .catch(() => {});
        } else {
            setBookmarkedIds(new Set());
            setShowSavedOnly(false);
        }
    }, [user]);

    const toggleBookmark = async (repoId: number) => {
        if (!user) return;

        // Optimistic Update: Change UI immediately
        const isCurrentlyBookmarked = bookmarkedIds.has(repoId);
        setBookmarkedIds(prev => {
            const next = new Set(prev);
            if (!isCurrentlyBookmarked) next.add(repoId);
            else next.delete(repoId);
            return next;
        });

        try {
            const res = await fetch("/api/bookmarks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ repoId }),
            });
            const data = await res.json();
            
            // If server disagrees (shouldn't happen often), we could re-sync
            if (!data.success) {
                // Silently re-sync bookmarks from server to be sure
                fetch("/api/bookmarks")
                    .then(r => r.json())
                    .then(d => {
                        if (d.bookmarks) {
                            setBookmarkedIds(new Set(d.bookmarks.map((b: any) => b.repoId)));
                        }
                    });
            }
        } catch (err) {
            console.error("Failed to toggle bookmark", err);
            // Rollback UI state on network error
            setBookmarkedIds(prev => {
                const next = new Set(prev);
                if (isCurrentlyBookmarked) next.add(repoId);
                else next.delete(repoId);
                return next;
            });
        }
    };

    const handleToggleSaved = () => {
        setShowSavedOnly(!showSavedOnly);
    };

    const handleUserChange = (newUser: any) => {
        setUser(newUser);
    };

    const fetchRepos = useCallback(
        async (
            pageNum: number,
            category: string | null,
            search: string,
            append: boolean
        ) => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                params.set("page", pageNum.toString());
                params.set("limit", "25");
                if (category) params.set("category", category);
                if (search) params.set("search", search);

                const res = await fetch(`/api/repos?${params.toString()}`);
                const data = await res.json();

                if (append) {
                    setReposList((prev) => [...prev, ...data.data]);
                } else {
                    setReposList(data.data);
                }
                setHasMore(data.hasMore);
            } catch (err) {
                console.error("Failed to fetch repos:", err);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchRepos(nextPage, activeCategory, searchQuery, true);
    };

    const handleCategoryChange = (slug: string | null) => {
        setActiveCategory(slug);
        setPage(1);
        fetchRepos(1, slug, searchQuery, false);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPage(1);
        fetchRepos(1, activeCategory, query, false);
    };

    const reposToDisplay = useMemo(() => {
        if (!showSavedOnly) return reposList;
        return reposList.filter(repo => bookmarkedIds.has(repo.id));
    }, [reposList, showSavedOnly, bookmarkedIds]);

    return (
        <>
            <Hero user={user} onUserChange={handleUserChange} />
            <FilterBar
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                onSearch={handleSearch}
                user={user}
                showSavedOnly={showSavedOnly}
                onToggleSaved={handleToggleSaved}
            />

            <RepoTable
                repos={reposToDisplay}
                categories={categories}
                user={user}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={toggleBookmark}
            />
            {!showSavedOnly && (
                <LoadMoreButton
                    onClick={handleLoadMore}
                    loading={loading}
                    hasMore={hasMore}
                />
            )}

            {/* Footer */}
            <footer
                style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <p style={{ fontSize: 24, margin: 0, color: "var(--fg)" }}>
                    REPO FOR THAT — BUILT FOR THE OPEN SOURCE OBSESSED
                </p>
                <p
                    style={{
                        fontSize: 16,
                        margin: "12px 0 0",
                        color: "var(--fg)",
                        opacity: 0.6,
                    }}
                >
                    LONG LIVE FOSS
                </p>
            </footer>
        </>
    );
}
