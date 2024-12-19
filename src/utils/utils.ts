export function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export async function logout() {
    document.cookie = "token=; expires=Sun, 20 Aug 2000 12:00:00 UTC";
    await new Promise((resolve) => setTimeout(resolve, 100));
    window.location.href = "/";
}

export function urlParser(message: string) {
    const urlRegex = /https:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const urlMatch = message.match(urlRegex);
    return  urlMatch?.length ? urlMatch[0] : null;
}

export function debounce(func: (...args: any[]) => void, delay: number) {
    let timeoutId: any;

    return function (this: void, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}