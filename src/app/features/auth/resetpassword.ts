import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-center relative overflow-hidden">
          <!-- Background pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
          </div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-center mx-auto mb-4">
              <img src="assets/image/logo/Logo.png" alt="Locato Logo" class="w-16 h-16 object-contain drop-shadow-lg" />
            </div>
            <h1 class="text-2xl font-bold text-white mb-2">Nouveau mot de passe</h1>
            <p class="text-white text-sm opacity-90">
              Créez un nouveau mot de passe sécurisé pour votre compte Locato
            </p>
          </div>
        </div>

        <!-- Security Icon Section -->
        <div class="px-8 py-6 bg-gray-50 border-b">
          <div class="flex items-center justify-center">
            <div class="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-full shadow-lg">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <p class="text-center text-sm text-gray-600 mt-3">
            Votre nouveau mot de passe doit contenir au moins 8 caractères
          </p>
        </div>

        <!-- Form -->
        <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()" class="p-8 space-y-6">
          <!-- Email (readonly) -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Adresse email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <input 
                type="email" 
                formControlName="email" 
                readonly
                class="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none cursor-not-allowed text-gray-600 font-medium">
            </div>
          </div>

          <!-- New Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Nouveau mot de passe</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <input 
                [type]="showPassword ? 'text' : 'password'" 
                formControlName="password" 
                placeholder="Saisissez votre nouveau mot de passe" 
                class="w-full pl-12 pr-14 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 font-medium"
                [class.border-red-500]="resetPasswordForm.get('password')?.invalid && resetPasswordForm.get('password')?.touched"
                [class.border-green-500]="resetPasswordForm.get('password')?.valid && resetPasswordForm.get('password')?.touched">
              <button 
                type="button" 
                (click)="togglePassword()" 
                class="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors">
                <svg *ngIf="!showPassword" class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                <svg *ngIf="showPassword" class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                </svg>
              </button>
            </div>
            <!-- Password strength indicator -->
            <div class="mt-2" *ngIf="resetPasswordForm.get('password')?.value">
              <div class="flex space-x-1">
                <div class="h-1 w-full rounded-full" [class]="getPasswordStrengthClass()"></div>
              </div>
              <p class="text-xs mt-1" [class]="getPasswordStrengthTextClass()">
                {{getPasswordStrengthText()}}
              </p>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Confirmer le mot de passe</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <input 
                [type]="showConfirmPassword ? 'text' : 'password'" 
                formControlName="password_confirmation" 
                placeholder="Confirmez votre nouveau mot de passe" 
                class="w-full pl-12 pr-14 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 font-medium"
                [class.border-red-500]="!passwordsMatch() && resetPasswordForm.get('password_confirmation')?.touched && resetPasswordForm.get('password_confirmation')?.value"
                [class.border-green-500]="passwordsMatch() && resetPasswordForm.get('password_confirmation')?.touched && resetPasswordForm.get('password_confirmation')?.value">
              <button 
                type="button" 
                (click)="toggleConfirmPassword()" 
                class="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors">
                <svg *ngIf="!showConfirmPassword" class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                <svg *ngIf="showConfirmPassword" class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                </svg>
              </button>
            </div>
            <!-- Password match indicator -->
            <div class="mt-2" *ngIf="resetPasswordForm.get('password_confirmation')?.value && resetPasswordForm.get('password_confirmation')?.touched">
              <div class="flex items-center space-x-2">
                <svg *ngIf="passwordsMatch()" class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <svg *ngIf="!passwordsMatch()" class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs" [class.text-green-600]="passwordsMatch()" [class.text-red-600]="!passwordsMatch()">
                  {{passwordsMatch() ? 'Les mots de passe correspondent' : 'Les mots de passe ne correspondent pas'}}
                </span>
              </div>
            </div>
          </div>

          <!-- Password Requirements -->
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 class="text-sm font-semibold text-blue-800 mb-2">Exigences du mot de passe :</h4>
            <ul class="space-y-1 text-xs text-blue-700">
              <li class="flex items-center space-x-2">
                <svg class="w-3 h-3" [class.text-green-500]="hasMinLength()" [class.text-blue-400]="!hasMinLength()" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Au moins 8 caractères</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-3 h-3" [class.text-green-500]="hasUpperCase()" [class.text-blue-400]="!hasUpperCase()" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Au moins une lettre majuscule</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-3 h-3" [class.text-green-500]="hasLowerCase()" [class.text-blue-400]="!hasLowerCase()" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Au moins une lettre minuscule</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-3 h-3" [class.text-green-500]="hasNumber()" [class.text-blue-400]="!hasNumber()" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Au moins un chiffre</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-3 h-3" [class.text-green-500]="hasSpecialChar()" [class.text-blue-400]="!hasSpecialChar()" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Au moins un caractère spécial (!@#$%^&*)</span>
              </li>
            </ul>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            [disabled]="!resetPasswordForm.valid || !passwordsMatch() || isLoading"
            class="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold py-4 rounded-xl hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
            <div class="flex items-center justify-center space-x-2">
              <svg *ngIf="!isLoading" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
              <div *ngIf="isLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>{{isLoading ? 'Mise à jour...' : 'Réinitialiser le mot de passe'}}</span>
            </div>
          </button>
        </form>

        <!-- Footer -->
        <div class="px-8 py-6 bg-gray-50 border-t text-center">
          <div class="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-4">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
            </svg>
            <span>Connexion sécurisée SSL</span>
          </div>
          
          <p class="text-sm text-gray-600 mb-4">
            Vous vous souvenez de votre mot de passe ?
            <a routerLink="/login" class="text-red-500 hover:text-red-600 font-semibold transition-colors">
              Se connecter
            </a>
          </p>

          <p class="text-xs text-gray-400">
            LOCATO © 2025 TOUS DROITS RÉSERVÉS
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }

    input:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    button:active {
      transform: scale(0.95);
    }

    .custom-gradient {
      background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
    }
  `]
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['yohivana794@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      password_confirmation: ['', [Validators.required]]
    });

    // Get token from route params
    this.route.params.subscribe(params => {
      this.token = params['token'] || '';
    });

    // Get email from query params if available
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.resetPasswordForm.patchValue({ email: params['email'] });
      }
    });
  }

  passwordStrengthValidator(control: any) {
    const value = control.value || '';
    
    const hasMinLength = value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    
    const valid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    
    return valid ? null : { weakPassword: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordsMatch(): boolean {
    const password = this.resetPasswordForm.get('password')?.value;
    const confirmPassword = this.resetPasswordForm.get('password_confirmation')?.value;
    return password === confirmPassword;
  }

  hasMinLength(): boolean {
    const password = this.resetPasswordForm.get('password')?.value || '';
    return password.length >= 8;
  }

  hasUpperCase(): boolean {
    const password = this.resetPasswordForm.get('password')?.value || '';
    return /[A-Z]/.test(password);
  }

  hasLowerCase(): boolean {
    const password = this.resetPasswordForm.get('password')?.value || '';
    return /[a-z]/.test(password);
  }

  hasNumber(): boolean {
    const password = this.resetPasswordForm.get('password')?.value || '';
    return /\d/.test(password);
  }

  hasSpecialChar(): boolean {
    const password = this.resetPasswordForm.get('password')?.value || '';
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  getPasswordStrength(): number {
    const password = this.resetPasswordForm.get('password')?.value || '';
    let strength = 0;
    
    if (this.hasMinLength()) strength++;
    if (this.hasUpperCase()) strength++;
    if (this.hasLowerCase()) strength++;
    if (this.hasNumber()) strength++;
    if (this.hasSpecialChar()) strength++;
    
    return strength;
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    
    if (strength <= 2) return 'bg-red-400';
    if (strength <= 3) return 'bg-yellow-400';
    if (strength <= 4) return 'bg-blue-400';
    return 'bg-green-500';
  }

  getPasswordStrengthTextClass(): string {
    const strength = this.getPasswordStrength();
    
    if (strength <= 2) return 'text-red-600';
    if (strength <= 3) return 'text-yellow-600';
    if (strength <= 4) return 'text-blue-600';
    return 'text-green-600';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    
    if (strength <= 2) return 'Mot de passe faible';
    if (strength <= 3) return 'Mot de passe moyen';
    if (strength <= 4) return 'Mot de passe fort';
    return 'Mot de passe très fort';
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.passwordsMatch()) {
      this.isLoading = true;
      
      const formData = {
        email: this.resetPasswordForm.get('email')?.value,
        password: this.resetPasswordForm.get('password')?.value,
        password_confirmation: this.resetPasswordForm.get('password_confirmation')?.value,
        token: this.token
      };

      // Simuler un appel API
      setTimeout(() => {
        this.isLoading = false;
        this.showSuccessToast('Mot de passe réinitialisé avec succès !');
        
        setTimeout(() => {
          this.router.navigate(['/login'], { 
            queryParams: { 
              message: 'Votre mot de passe a été réinitialisé. Vous pouvez maintenant vous connecter.' 
            }
          });
        }, 2000);
      }, 2000);
      
    } else {
      this.markFormGroupTouched();
      if (!this.passwordsMatch()) {
        this.showErrorToast('Les mots de passe ne correspondent pas');
      } else {
        this.showErrorToast('Veuillez remplir correctement tous les champs requis');
      }
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.resetPasswordForm.controls).forEach(key => {
      const control = this.resetPasswordForm.get(key);
      control?.markAsTouched();
    });
  }

  private showSuccessToast(title: string) {
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