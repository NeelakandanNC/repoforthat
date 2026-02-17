export function formatStars(n: number): string {
    if (n >= 1_000_000) {
        return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (n >= 1_000) {
        return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return n.toString();
}

export function extractRepoName(url: string): string {
    const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
    return match ? match[1] : url;
}

export function debounce<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
