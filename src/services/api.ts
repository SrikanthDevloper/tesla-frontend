const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
        "Content-Type": "application/json",
        },
        ...options,
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
}