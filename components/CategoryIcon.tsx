// Tiny 16x16-ish CSS pixel art icons for each category
// Using inline SVG for crisp, scalable pixel icons

import React from "react";

export default function CategoryIcon({ icon, size = 16 }: { icon: string; size?: number }) {
    const color = "currentColor";

    const icons: Record<string, React.ReactElement> = {
        robot: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="1" y="2" width="6" height="5" fill={color} />
                <rect x="3" y="0" width="2" height="2" fill={color} />
                <rect x="2" y="3" width="1" height="1" fill="var(--bg)" />
                <rect x="5" y="3" width="1" height="1" fill="var(--bg)" />
                <rect x="3" y="5" width="2" height="1" fill="var(--bg)" />
            </svg>
        ),
        brain: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="2" y="0" width="4" height="1" fill={color} />
                <rect x="1" y="1" width="6" height="1" fill={color} />
                <rect x="0" y="2" width="8" height="1" fill={color} />
                <rect x="0" y="3" width="8" height="1" fill={color} />
                <rect x="1" y="4" width="6" height="1" fill={color} />
                <rect x="1" y="5" width="6" height="1" fill={color} />
                <rect x="2" y="6" width="4" height="1" fill={color} />
                <rect x="3" y="3" width="2" height="1" fill="var(--bg)" />
            </svg>
        ),
        wrench: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="5" y="0" width="2" height="1" fill={color} />
                <rect x="4" y="1" width="3" height="1" fill={color} />
                <rect x="3" y="2" width="2" height="1" fill={color} />
                <rect x="2" y="3" width="2" height="1" fill={color} />
                <rect x="1" y="4" width="2" height="1" fill={color} />
                <rect x="0" y="5" width="3" height="1" fill={color} />
                <rect x="0" y="6" width="2" height="1" fill={color} />
                <rect x="0" y="7" width="1" height="1" fill={color} />
            </svg>
        ),
        palette: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="2" y="0" width="4" height="1" fill={color} />
                <rect x="1" y="1" width="6" height="1" fill={color} />
                <rect x="0" y="2" width="8" height="1" fill={color} />
                <rect x="0" y="3" width="8" height="1" fill={color} />
                <rect x="0" y="4" width="7" height="1" fill={color} />
                <rect x="0" y="5" width="6" height="1" fill={color} />
                <rect x="1" y="6" width="4" height="1" fill={color} />
                <rect x="2" y="3" width="1" height="1" fill="var(--bg)" />
                <rect x="5" y="2" width="1" height="1" fill="var(--bg)" />
                <rect x="2" y="5" width="1" height="1" fill="var(--bg)" />
            </svg>
        ),
        cylinder: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="1" y="0" width="6" height="1" fill={color} />
                <rect x="0" y="1" width="8" height="1" fill={color} />
                <rect x="1" y="2" width="6" height="1" fill={color} />
                <rect x="1" y="3" width="1" height="3" fill={color} />
                <rect x="6" y="3" width="1" height="3" fill={color} />
                <rect x="1" y="6" width="6" height="1" fill={color} />
                <rect x="0" y="7" width="8" height="1" fill={color} />
            </svg>
        ),
        grid: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="0" y="0" width="3" height="3" fill={color} />
                <rect x="4" y="0" width="3" height="3" fill={color} />
                <rect x="0" y="4" width="3" height="3" fill={color} />
                <rect x="4" y="4" width="3" height="3" fill={color} />
            </svg>
        ),
        lightning: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="4" y="0" width="2" height="1" fill={color} />
                <rect x="3" y="1" width="2" height="1" fill={color} />
                <rect x="2" y="2" width="2" height="1" fill={color} />
                <rect x="1" y="3" width="4" height="1" fill={color} />
                <rect x="3" y="4" width="2" height="1" fill={color} />
                <rect x="2" y="5" width="2" height="1" fill={color} />
                <rect x="1" y="6" width="2" height="1" fill={color} />
            </svg>
        ),
        server: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="0" y="0" width="8" height="3" fill={color} />
                <rect x="1" y="1" width="1" height="1" fill="var(--bg)" />
                <rect x="0" y="4" width="8" height="3" fill={color} />
                <rect x="1" y="5" width="1" height="1" fill="var(--bg)" />
                <rect x="3" y="7" width="2" height="1" fill={color} />
            </svg>
        ),
        clock: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="2" y="0" width="4" height="1" fill={color} />
                <rect x="1" y="1" width="1" height="1" fill={color} />
                <rect x="6" y="1" width="1" height="1" fill={color} />
                <rect x="0" y="2" width="1" height="4" fill={color} />
                <rect x="7" y="2" width="1" height="4" fill={color} />
                <rect x="1" y="6" width="1" height="1" fill={color} />
                <rect x="6" y="6" width="1" height="1" fill={color} />
                <rect x="2" y="7" width="4" height="1" fill={color} />
                <rect x="4" y="2" width="1" height="3" fill={color} />
                <rect x="4" y="4" width="2" height="1" fill={color} />
            </svg>
        ),
        lock: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="2" y="0" width="4" height="1" fill={color} />
                <rect x="1" y="1" width="1" height="2" fill={color} />
                <rect x="6" y="1" width="1" height="2" fill={color} />
                <rect x="0" y="3" width="8" height="5" fill={color} />
                <rect x="3" y="5" width="2" height="2" fill="var(--bg)" />
            </svg>
        ),
        chart: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="0" y="7" width="8" height="1" fill={color} />
                <rect x="1" y="4" width="1" height="3" fill={color} />
                <rect x="3" y="2" width="1" height="5" fill={color} />
                <rect x="5" y="5" width="1" height="2" fill={color} />
                <rect x="7" y="1" width="1" height="6" fill={color} />
            </svg>
        ),
        eye: (
            <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                <rect x="2" y="1" width="4" height="1" fill={color} />
                <rect x="1" y="2" width="1" height="1" fill={color} />
                <rect x="6" y="2" width="1" height="1" fill={color} />
                <rect x="0" y="3" width="8" height="2" fill={color} />
                <rect x="3" y="3" width="2" height="2" fill="var(--bg)" />
                <rect x="1" y="5" width="1" height="1" fill={color} />
                <rect x="6" y="5" width="1" height="1" fill={color} />
                <rect x="2" y="6" width="4" height="1" fill={color} />
            </svg>
        ),
    };

    return icons[icon] || <span>■</span>;
}
