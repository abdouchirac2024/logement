import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, throwError } from 'rxjs';
import { LoginRequest, LoginResponse, AuthState } from '../models/auth.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

export interface RegisterRequest {
    name: string;
    prenom: string;
    email: string;
    telephone: string;
    password: string;
    password_confirmation: string;
    role: 'Bailleur' | 'Locataire';
    numFiscal?: string;
    description?: string;
    preference?: string;
    quartier_id: number;
    ville_id: number;
}

export interface RegisterResponse {
    message: string;
    user?: any;
    token?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = environment.apiUrl;
    private authState = new BehaviorSubject<AuthState>({
        isAuthenticated: false,
        token: null,
        user: null,
        error: null
    });

    constructor(private http: HttpClient) {
        // Vérifier le token au démarrage
        const token = localStorage.getItem('token');
        if (token) {
            this.authState.next({
                ...this.authState.value,
                isAuthenticated: true,
                token: token
            });
        }
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
            .pipe(
                tap(response => {
                    if (response.token) {
                        // Stocker le token dans le localStorage
                        localStorage.setItem('token', response.token);
                        // Mettre à jour l'état d'authentification
                        this.authState.next({
                            isAuthenticated: true,
                            token: response.token,
                            user: response.user,
                            error: null
                        });
                    }
                }),
                catchError(error => {
                    const errorMessage = error.error?.message || 'Une erreur est survenue lors de la connexion';
                    this.authState.next({
                        ...this.authState.value,
                        error: errorMessage
                    });
                    return throwError(() => error);
                })
            );
    }

    logout(): void {
        // Supprimer le token du localStorage
        localStorage.removeItem('token');
        // Réinitialiser l'état d'authentification
        this.authState.next({
            isAuthenticated: false,
            token: null,
            user: null,
            error: null
        });
    }

    getAuthState(): Observable<AuthState> {
        return this.authState.asObservable();
    }

    isAuthenticated(): boolean {
        return this.authState.value.isAuthenticated;
    }

    getToken(): string | null {
        return this.authState.value.token;
    }

    // Méthode pour créer les headers avec le token
    getAuthHeaders(): HttpHeaders {
        const token = this.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    register(data: RegisterRequest): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.API_URL}/auth/register`, data);
    }

    getCurrentUser(): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${this.API_URL}/auth/user`, { headers });
    }
} 