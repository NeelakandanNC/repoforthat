"use client";

import { useState, useCallback } from "react";
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

    return (
        <>

            <Hero />
            <FilterBar
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                onSearch={handleSearch}
            />

            <RepoTable repos={reposList} categories={categories} />
            <LoadMoreButton
                onClick={handleLoadMore}
                loading={loading}
                hasMore={hasMore}
            />


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
