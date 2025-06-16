export interface LoginRequest {
    login: string;
    password: string;
}

export interface LoginResponse {
    token?: string;
    user?: any; // Vous pouvez définir une interface User plus détaillée si nécessaire
    message?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: any | null;
    error: string | null;
} 