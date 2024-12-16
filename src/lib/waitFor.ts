export async function waitFor(s: number) {
    return new Promise((r) => {
        setTimeout(r, s * 1000);
    })
}