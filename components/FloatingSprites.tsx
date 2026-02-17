"use client";

export default function FloatingSprites() {
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 2,
                overflow: "hidden",
            }}
        >
            {/* Sprite: </> Code Tag — Top Right corner */}
            <div
                className="sprite sprite-float"
                style={{ top: 20, right: 30, animationDelay: "0s" }}
            >
                <CodeTagSprite />
            </div>

            {/* Sprite: { } Curly Braces — Top Left corner */}
            <div
                className="sprite sprite-float"
                style={{ top: 16, left: 20, animationDelay: "0.8s" }}
            >
                <CurlyBraceSprite />
            </div>

            {/* Sprite: Pull Request — Top Right below hero */}
            <div
                className="sprite sprite-float"
                style={{ top: 100, right: 16, animationDelay: "0.5s" }}
            >
                <PullRequestSprite />
            </div>

            {/* Sprite: GitHub Star — Top Left below hero */}
            <div
                className="sprite sprite-float"
                style={{ top: 110, left: 16, animationDelay: "1.2s" }}
            >
                <StarSprite />
            </div>

            {/* Sprite: Git Branch — Far left edge */}
            <div
                className="sprite sprite-float"
                style={{ top: 200, left: 8, animationDelay: "0.3s" }}
            >
                <GitBranchSprite />
            </div>

            {/* Sprite: Terminal Cursor — Far right edge */}
            <div
                className="sprite sprite-float"
                style={{ top: 200, right: 8, animationDelay: "0.7s" }}
            >
                <TerminalSprite />
            </div>

            {/* Sprite: Bug — Bottom Left corner */}
            <div
                className="sprite sprite-float"
                style={{ bottom: 60, left: 16, animationDelay: "1.5s" }}
            >
                <BugSprite />
            </div>

            {/* Sprite: Coffee Cup — Bottom Right corner */}
            <div
                className="sprite sprite-float"
                style={{ bottom: 80, right: 16, animationDelay: "1.0s" }}
            >
                <CoffeeSprite />
            </div>

            {/* Sprite: Commit Dot — Bottom area */}
            <div
                className="sprite sprite-float"
                style={{ bottom: 30, right: 100, animationDelay: "1.8s" }}
            >
                <CommitSprite />
            </div>

            {/* Sprite: # Hash — Bottom Left area */}
            <div
                className="sprite sprite-float"
                style={{ bottom: 20, left: 80, animationDelay: "0.4s" }}
            >
                <HashSprite />
            </div>
        </div>
    );
}

/* =============================== */
/*  CSS Pixel Art Sprites          */
/*  Using box-shadow technique     */
/* =============================== */

const px = (shadows: string) => ({
    width: 1,
    height: 1,
    background: "transparent",
    boxShadow: shadows,
    transform: "scale(4)",
});

// </> Code Tag
function CodeTagSprite() {
    const s = `
    1px 0px 0 var(--fg),
    2px 1px 0 var(--fg),
    3px 2px 0 var(--fg),
    2px 3px 0 var(--fg),
    1px 4px 0 var(--fg),
    6px 0px 0 var(--fg),
    5px 1px 0 var(--fg),
    4px 2px 0 var(--fg),
    5px 3px 0 var(--fg),
    6px 4px 0 var(--fg),
    8px 0px 0 var(--fg),
    9px 1px 0 var(--fg),
    8px 2px 0 var(--fg),
    9px 3px 0 var(--fg),
    8px 4px 0 var(--fg)
  `.trim();
    return <div style={px(s)} />;
}

// Git Branch Fork
function GitBranchSprite() {
    const s = `
    3px 0px 0 var(--fg),
    3px 1px 0 var(--fg),
    3px 2px 0 var(--fg),
    3px 3px 0 var(--fg),
    2px 3px 0 var(--fg),
    1px 4px 0 var(--fg),
    4px 3px 0 var(--fg),
    5px 4px 0 var(--fg),
    1px 5px 0 var(--fg),
    5px 5px 0 var(--fg),
    1px 6px 0 var(--fg),
    5px 6px 0 var(--fg)
  `.trim();
    return <div style={px(s)} />;
}

// Terminal $_ Cursor
function TerminalSprite() {
    const s = `
    0px 0px 0 var(--fg),
    1px 0px 0 var(--fg),
    0px 1px 0 var(--fg),
    0px 2px 0 var(--fg),
    1px 2px 0 var(--fg),
    3px 2px 0 var(--fg),
    4px 3px 0 var(--fg),
    5px 3px 0 var(--fg),
    6px 3px 0 var(--fg),
    7px 3px 0 var(--fg)
  `.trim();
    return (
        <div style={{ position: "relative" }}>
            <div style={px(s)} />
            <div
                style={{
                    position: "absolute",
                    left: 36,
                    top: 12,
                    width: 4,
                    height: 4,
                    background: "var(--fg)",
                    animation: "pixel-blink 1s steps(1) infinite",
                }}
            />
        </div>
    );
}

// GitHub Star ★
function StarSprite() {
    const s = `
    3px 0px 0 var(--fg),
    2px 1px 0 var(--fg),
    3px 1px 0 var(--fg),
    4px 1px 0 var(--fg),
    0px 2px 0 var(--fg),
    1px 2px 0 var(--fg),
    2px 2px 0 var(--fg),
    3px 2px 0 var(--fg),
    4px 2px 0 var(--fg),
    5px 2px 0 var(--fg),
    6px 2px 0 var(--fg),
    1px 3px 0 var(--fg),
    2px 3px 0 var(--fg),
    3px 3px 0 var(--fg),
    4px 3px 0 var(--fg),
    5px 3px 0 var(--fg),
    1px 4px 0 var(--fg),
    2px 4px 0 var(--fg),
    4px 4px 0 var(--fg),
    5px 4px 0 var(--fg),
    0px 5px 0 var(--fg),
    1px 5px 0 var(--fg),
    5px 5px 0 var(--fg),
    6px 5px 0 var(--fg)
  `.trim();
    return <div style={px(s)} />;
}

// Pull Request Icon
function PullRequestSprite() {
    const s = `
    1px 0px 0 var(--fg),
    0px 1px 0 var(--fg),
    2px 1px 0 var(--fg),
    1px 2px 0 var(--fg),
    1px 3px 0 var(--fg),
    1px 4px 0 var(--fg),
    2px 4px 0 var(--fg),
    3px 4px 0 var(--fg),
    4px 3px 0 var(--fg),
    4px 2px 0 var(--fg),
    4px 1px 0 var(--fg),
    4px 5px 0 var(--fg),
    4px 6px 0 var(--fg),
    3px 7px 0 var(--fg),
    5px 7px 0 var(--fg),
    4px 8px 0 var(--fg)
  `.trim();
    return <div style={px(s)} />;
}

// { } Curly Braces
function CurlyBraceSprite() {
    const s = `
    2px 0px 0 var(--fg),
    1px 1px 0 var(--fg),
    1px 2px 0 var(--fg),
    0px 3px 0 var(--fg),
    1px 4px 0 var(--fg),
    1px 5px 0 var(--fg),
    2px 6px 0 var(--fg),
    5px 0px 0 var(--fg),
    6px 1px 0 var(--fg),
    6px 2px 0 var(--fg),
    7px 3px 0 var(--fg),
    6px 4px 0 var(--fg),
    6px 5px 0 var(--fg),
    5px 6px 0 var(--fg)
  `.trim();
    return <div style={px(s)} />;
}

// Bug (pixel insect)
function BugSprite() {
    const s = `
    2px 0px 0 var(--fg),
    4px 0px 0 var(--fg),
    1px 1px 0 var(--fg),
    2px 1px 0 var(--fg),
    3px 1px 0 var(--fg),
    4px 1px 0 var(--fg),
    5px 1px 0 var(--fg),
    2px 2px 0 var(--fg),
    3px 2px 0 var(--fg),
    4px 2px 0 var(--fg),
    0px 3px 0 var(--fg),
    2px 3px 0 var(--fg),
    3px 3px 0 var(--fg),
    4px 3px 0 var(--fg),
    6px 3px 0 var(--fg),
    1px 4px 0 var(--fg),
    5px 4px 0 var(--fg)
  `.trim();
    return <div style={px(s)} />;
}

// Coffee Cup
function CoffeeSprite() {
    const s = `
    2px 0px 0 var(--fg),
    4px 0px 0 var(--fg),
    1px 1px 0 var(--fg),
    3px 1px 0 var(--fg),
    5px 1px 0 var(--fg),
    1px 2px 0 var(--fg),
    2px 2px 0 var(--fg),
    3px 2px 0 var(--fg),
    4px 2px 0 var(--fg),
    5px 2px 0 var(--fg),
    6px 2px 0 var(--fg),
    1px 3px 0 var(--fg),
    2px 3px 0 var(--fg),
    3px 3px 0 var(--fg),
    4px 3px 0 var(--fg),
    5px 3px 0 var(--fg),
    6px 3px 0 var(--fg),
    7px 3px 0 var(--fg),
    1px 4px 0 var(--fg),
    2px 4px 0 var(--fg),
    3px 4px 0 var(--fg),
    4px 4px 0 var(--fg),
    5px 4px 0 var(--fg),
    6px 4px 0 var(--fg),
    7px 4px 0 var(--fg),
    2px 5px 0 var(--fg),
    3px 5px 0 var(--fg),
    4px 5px 0 var(--fg),
    5px 5px 0 var(--fg)
  `.trim();
    return <div style={px(s)} />;
}

// Commit Dot (dot on a line)
function CommitSprite() {
    const s = `
    0px 2px 0 var(--fg),
    1px 2px 0 var(--fg),
    2px 1px 0 var(--fg),
    2px 3px 0 var(--fg),
    3px 0px 0 var(--fg),
    3px 1px 0 var(--fg),
    3px 2px 0 var(--fg),
    3px 3px 0 var(--fg),
    3px 4px 0 var(--fg),
    4px 1px 0 var(--fg),
    4px 3px 0 var(--fg),
    5px 2px 0 var(--fg),
    6px 2px 0 var(--fg)
  `.trim();
    return <div style={px(s)} />;
}

// # Hash / Octothorpe
function HashSprite() {
    const s = `
    2px 0px 0 var(--fg),
    4px 0px 0 var(--fg),
    0px 1px 0 var(--fg),
    1px 1px 0 var(--fg),
    2px 1px 0 var(--fg),
    3px 1px 0 var(--fg),
    4px 1px 0 var(--fg),
    5px 1px 0 var(--fg),
    2px 2px 0 var(--fg),
    4px 2px 0 var(--fg),
    0px 3px 0 var(--fg),
    1px 3px 0 var(--fg),
    2px 3px 0 var(--fg),
    3px 3px 0 var(--fg),
    4px 3px 0 var(--fg),
    5px 3px 0 var(--fg),
    2px 4px 0 var(--fg),
    4px 4px 0 var(--fg)
  `.trim();
    return <div style={px(s)} />;
}
