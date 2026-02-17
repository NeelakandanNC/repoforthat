"use client";

interface LoadMoreButtonProps {
    onClick: () => void;
    loading: boolean;
    hasMore: boolean;
}

export default function LoadMoreButton({
    onClick,
    loading,
    hasMore,
}: LoadMoreButtonProps) {
    if (!hasMore) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "30px 20px",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <span
                    style={{
                        fontSize: 22,
                        color: "var(--fg)",
                        opacity: 0.5,
                        border: "2px solid var(--fg)",
                        padding: "10px 30px",
                    }}
                >
                    [ ★ YOU&apos;VE SEEN IT ALL ★ ]
                </span>
            </div>
        );
    }

    return (
        <div
            style={{
                textAlign: "center",
                padding: "30px 20px",
                position: "relative",
                zIndex: 1,
            }}
        >
            <button
                onClick={onClick}
                disabled={loading}
                className="pixel-btn"
                style={{
                    fontSize: 22,
                    padding: "12px 40px",
                    minWidth: 280,
                }}
            >
                {loading ? (
                    <span style={{ animation: "pixel-blink 0.5s steps(1) infinite" }}>
                        █ LOADING...
                    </span>
                ) : (
                    "▶ LOAD MORE REPOS"
                )}
            </button>
        </div>
    );
}
