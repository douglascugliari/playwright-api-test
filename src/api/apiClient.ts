import { request } from '@playwright/test'
import { env } from '../config/env';

export async function apiClient(token?: string) {
    const baseURL = env.baseUrl;

    if (!baseURL) {
        throw new Error('BASE_URL não foi definida nas variáveis de ambiente.');
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['authorization'] = `Bearer ${token}`;
    }

    return await request.newContext({
        baseURL,
        extraHTTPHeaders: headers
    })

}
