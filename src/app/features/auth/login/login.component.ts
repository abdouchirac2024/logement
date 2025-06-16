import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    isLoading = false;
    showPassword = false;
    currentSlide = 0;
    private slideInterval: any;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            login: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    ngOnInit() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }

    ngOnDestroy() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % 3;
    }

    goToSlide(index: number) {
        this.currentSlide = index;
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = setInterval(() => {
                this.nextSlide();
            }, 4000);
        }
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    private showToast(icon: 'success' | 'error', title: string) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            customClass: {
                popup: 'custom-toast',
                title: 'custom-toast-title',
                icon: 'custom-toast-icon',
                timerProgressBar: 'custom-toast-progress'
            },
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
            showClass: {
                popup: 'animate__animated animate__fadeInRight'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutRight'
            },
            background: icon === 'success' ? '#10B981' : '#E0252C',
            color: '#ffffff',
            iconColor: '#ffffff',
            padding: '1rem 1.5rem'
        });

        Toast.fire({
            icon: icon,
            title: title
        });
    }

    async onSubmit() {
        try {
            if (this.loginForm.invalid) {
                this.loginForm.markAllAsTouched();
                this.showToast('error', 'Veuillez remplir correctement tous les champs');
                return;
            }

            this.isLoading = true;
            const credentials = this.loginForm.value;

            this.authService.login(credentials).subscribe({
                next: (response) => {
                    this.showToast('success', 'Connexion réussie !');
                    setTimeout(() => {
                        this.router.navigate(['/dashboard']);
                    }, 1000);
                },
                error: (error) => {
                    const errorMessage = error.error?.message || 'Une erreur est survenue lors de la connexion';
                    this.showToast('error', errorMessage);
                },
                complete: () => {
                    this.isLoading = false;
                }
            });
        } catch (error) {
            this.showToast('error', error instanceof Error ? error.message : 'Une erreur est survenue lors de la connexion');
            this.isLoading = false;
        }
    }

    goToForgotPassword() {
        this.router.navigate(['/forgot-password']);
    }
}