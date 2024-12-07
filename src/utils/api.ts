type FetchOptions = RequestInit & {
    suppressErrors?: boolean;
};

// Prevent console errors for fetch
const originalFetch = window.fetch;
window.fetch = async function silentFetch(input: RequestInfo | URL, init?: RequestInit) {
    try {
        const response = await originalFetch(input, init);
        return response;
    } catch (error) {
        // Return a fake response object for network errors
        return new Response(JSON.stringify({ message: 'Network error' }), {
            status: 500,
            statusText: 'Network Error'
        });
    }
};

export async function apiFetch<T>(
    url: string,
    options: FetchOptions = {}
): Promise<{ data: T | null; error: string | null; status: number }> {
    const { suppressErrors = false, ...fetchOptions } = options;

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            credentials: 'include'
        });

        let data = null;
        try {
            data = await response.json();
        } catch {
            // Ignore JSON parse errors
        }

        // For suppressed errors, just return the result
        if (suppressErrors) {
            return {
                data,
                error: null,
                status: response.status
            };
        }

        // For non-suppressed errors, throw if not ok
        if (!response.ok) {
            throw new Error(data?.message || 'Request failed');
        }

        return {
            data,
            error: null,
            status: response.status
        };
    } catch (err) {
        if (suppressErrors) {
            return {
                data: null,
                error: err instanceof Error ? err.message : 'Request failed',
                status: 500
            };
        }
        throw err;
    }
} 