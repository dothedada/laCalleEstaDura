export function createID(section: string, element: string): string {
    const date = new Date().toISOString().replace(/\D/g, '').slice(0, 8);
    const hash = (Math.random() * 10_000 * new Date().getTime())
        .toString(26)
        .replace(/\./g, '')
        .slice(0, 10)
        .padEnd(10, '0');
    return `${section}_${element}_${date}-${hash}`;
}

export function loader() {}
