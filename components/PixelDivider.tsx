export default function PixelDivider() {
    return (
        <div
            style={{
                width: "100%",
                height: 16,
                display: "flex",
                flexWrap: "nowrap",
                overflow: "hidden",
                position: "relative",
                zIndex: 1,
            }}
            aria-hidden="true"
        >
            {Array.from({ length: 150 }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        width: 8,
                        height: 8,
                        flexShrink: 0,
                        background: i % 2 === 0 ? "var(--fg)" : "transparent",
                        marginTop: i % 3 === 0 ? 0 : 8,
                    }}
                />
            ))}
        </div>
    );
}
