const API_URL = 'http://localhost:3001/api';

class ApiService {
    private token: string | null = null;

    constructor() {
        this.token = localStorage.getItem('token');
    }

    setToken(token: string | null) {
        this.token = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    getToken() {
        return this.token;
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>)
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const url = `${API_URL}${endpoint}`;
        console.log('API Request:', options.method || 'GET', url);

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            const data = await response.json();
            console.log('API Response:', response.status, data);

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error: any) {
            console.error('API Error:', error);
            if (error.message === 'Failed to fetch') {
                throw new Error('Cannot connect to server. Make sure the backend is running on http://localhost:3001');
            }
            throw error;
        }
    }

    // Auth
    async register(email: string, password: string, name: string, company?: string) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name, company })
        });
        this.setToken(data.token);
        return data;
    }

    async login(email: string, password: string) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        this.setToken(data.token);
        return data;
    }

    async verifyToken() {
        return this.request('/auth/verify');
    }

    logout() {
        this.setToken(null);
    }

    // User
    async getProfile() {
        return this.request('/users/me');
    }

    async updateProfile(data: { name?: string; company?: string; preferences?: { theme?: string; language?: string } }) {
        return this.request('/users/me', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async changePassword(currentPassword: string, newPassword: string) {
        return this.request('/users/password', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword })
        });
    }

    // Templates
    async getTemplates() {
        return this.request('/templates');
    }

    async getTemplate(id: string) {
        return this.request(`/templates/${id}`);
    }

    async createTemplate(template: {
        title: string;
        description?: string;
        category?: string;
        content: string;
        placeholders?: string[];
        isPinned?: boolean;
    }) {
        return this.request('/templates', {
            method: 'POST',
            body: JSON.stringify(template)
        });
    }

    async updateTemplate(id: string, updates: {
        title?: string;
        description?: string;
        category?: string;
        content?: string;
        placeholders?: string[];
        isPinned?: boolean;
    }) {
        return this.request(`/templates/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }

    async togglePin(id: string) {
        return this.request(`/templates/${id}/pin`, {
            method: 'PATCH'
        });
    }

    async duplicateTemplate(id: string) {
        return this.request(`/templates/${id}/duplicate`, {
            method: 'POST'
        });
    }

    async deleteTemplate(id: string) {
        return this.request(`/templates/${id}`, {
            method: 'DELETE'
        });
    }
}

export const apiService = new ApiService();
