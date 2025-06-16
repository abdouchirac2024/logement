import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { gsap } from 'gsap';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      <!-- Floating animated background elements -->
      <div class="absolute -top-20 -left-20 w-40 h-40 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-1 relative z-10">
        <!-- Header with animated waves -->
        <div class="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-center relative overflow-hidden">
          <div class="absolute inset-0 overflow-hidden opacity-20">
            <div class="wave wave1"></div>
            <div class="wave wave2"></div>
            <div class="wave wave3"></div>
          </div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-center mx-auto mb-4 animate-bounce">
              <img src="assets/image/logo/Logo.png" alt="Locato Logo" 
                   class="w-16 h-16 object-contain drop-shadow-lg transition-transform duration-300 hover:rotate-6 hover:scale-110" />
            </div>
            <h1 class="text-2xl font-bold text-white mb-2 animate-fade-in-down">Nouveau mot de passe</h1>
            <p class="text-white text-sm opacity-90 animate-fade-in-up">
              Créez un nouveau mot de passe sécurisé pour votre compte Locato
            </p>
          </div>
        </div>

        <!-- Security Icon Section with pulse animation -->
        <div class="px-8 py-6 bg-gray-50 border-b">
          <div class="flex items-center justify-center">
            <div class="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-full shadow-lg animate-pulse-slow">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <p class="text-center text-sm text-gray-600 mt-3 animate-fade-in">
            Votre nouveau mot de passe doit contenir au moins 8 caractères
          </p>
        </div>

        <!-- Form -->
        <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()" class="p-8 space-y-6">
          <!-- Email -->
          <div class="animate-fade-in">
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
                placeholder="Entrez votre adresse email"
                class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 font-medium hover:shadow-sm focus:shadow-md"
                [class.border-red-500]="resetPasswordForm.get('email')?.invalid && resetPasswordForm.get('email')?.touched"
                [class.border-green-500]="resetPasswordForm.get('email')?.valid && resetPasswordForm.get('email')?.touched">
            </div>
            <div *ngIf="resetPasswordForm.get('email')?.invalid && resetPasswordForm.get('email')?.touched" 
                 class="mt-1 text-sm text-red-600">
              <span *ngIf="resetPasswordForm.get('email')?.errors?.['required']">L'email est requis</span>
              <span *ngIf="resetPasswordForm.get('email')?.errors?.['email']">Format d'email invalide</span>
            </div>
          </div>

          <!-- New Password -->
          <div class="animate-fade-in" #passwordField>
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
                (focus)="animatePasswordField()"
                class="w-full pl-12 pr-14 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 font-medium hover:shadow-sm focus:shadow-md"
                [class.border-red-500]="resetPasswordForm.get('password')?.invalid && resetPasswordForm.get('password')?.touched"
                [class.border-green-500]="resetPasswordForm.get('password')?.valid && resetPasswordForm.get('password')?.touched">
              <button 
                type="button" 
                (click)="togglePassword()" 
                class="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors duration-300 hover:scale-110">
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
              <div class="flex space-x-1 h-2 rounded-full overflow-hidden bg-gray-200">
                <div class="h-full transition-all duration-500 ease-out" 
                     [ngClass]="{
                       'bg-red-500': passwordStrength === 'weak',
                       'bg-yellow-500': passwordStrength === 'medium',
                       'bg-green-500': passwordStrength === 'strong'
                     }"
                     [style.width.%]="passwordStrengthPercentage"></div>
              </div>
              <p class="text-xs mt-1 font-medium" [ngClass]="{
                'text-red-600': passwordStrength === 'weak',
                'text-yellow-600': passwordStrength === 'medium',
                'text-green-600': passwordStrength === 'strong'
              }">
                {{getPasswordStrengthText()}} ({{passwordStrengthPercentage}}%)
              </p>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="animate-fade-in">
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
                class="w-full pl-12 pr-14 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 font-medium hover:shadow-sm focus:shadow-md"
                [class.border-red-500]="!passwordsMatch() && resetPasswordForm.get('password_confirmation')?.touched && resetPasswordForm.get('password_confirmation')?.value"
                [class.border-green-500]="passwordsMatch() && resetPasswordForm.get('password_confirmation')?.touched && resetPasswordForm.get('password_confirmation')?.value">
              <button 
                type="button" 
                (click)="toggleConfirmPassword()" 
                class="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors duration-300 hover:scale-110">
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
              <div class="flex items-center space-x-2 animate-fade-in">
                <svg *ngIf="passwordsMatch()" class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <svg *ngIf="!passwordsMatch()" class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs font-medium" [class.text-green-600]="passwordsMatch()" [class.text-red-600]="!passwordsMatch()">
                  {{passwordsMatch() ? 'Les mots de passe correspondent' : 'Les mots de passe ne correspondent pas'}}
                </span>
              </div>
            </div>
          </div>

          <!-- Password Requirements -->
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 animate-fade-in">
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
                <span>Au moins un caractère spécial (!&#64;#$%^&*)</span>
              </li>
            </ul>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="isLoading"
            class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg
              *ngIf="isLoading"
              class="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span class="flex items-center">
              <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
              {{ isLoading ? 'Réinitialisation en cours...' : 'Réinitialiser mon mot de passe' }}
            </span>
          </button>

          <!-- Back to Login Link -->
          <div class="text-center mt-4">
            <a
              routerLink="/login"
              class="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors duration-300"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Retour à la connexion
            </a>
          </div>
        </form>

        <!-- Footer -->
        <div class="px-8 py-6 bg-gray-50 border-t text-center animate-fade-in-up">
          <div class="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-4">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
            </svg>
            <span>Connexion sécurisée SSL</span>
          </div>
          
          <p class="text-sm text-gray-600 mb-4">
            Vous vous souvenez de votre mot de passe ?
            <a routerLink="/login" class="text-red-500 hover:text-red-600 font-semibold transition-colors duration-300">
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
    /* Animations */
    .animate-blob {
      animation: blob 7s infinite;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }

    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
    
    .animate-fade-in-down {
      animation: fadeInDown 0.6s ease-out forwards;
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Wave animation */
    .wave {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 200%;
      height: 100%;
      background-repeat: repeat no-repeat;
      background-position: 0 bottom;
      transform-origin: center bottom;
    }
    
    .wave1 {
      background-size: 50% 80px;
      animation: wave 15s linear infinite;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23ffffff'%3E%3C/path%3E%3C/svg%3E");
    }
    
    .wave2 {
      background-size: 50% 100px;
      animation: wave 10s linear reverse infinite;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23ffffff'%3E%3C/path%3E%3C/svg%3E");
    }
    
    .wave3 {
      background-size: 50% 80px;
      animation: wave 5s linear infinite;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23ffffff'%3E%3C/path%3E%3C/svg%3E");
    }
    
    @keyframes wave {
      0% {
        transform: translateX(0) translateZ(0) scaleY(1);
      }
      50% {
        transform: translateX(-25%) translateZ(0) scaleY(0.8);
      }
      100% {
        transform: translateX(-50%) translateZ(0) scaleY(1);
      }
    }

    /* Pulse animation */
    .animate-pulse-slow {
      animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
      }
    }

    /* Bounce animation */
    .animate-bounce {
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    /* Custom focus styles */
    input:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }

    /* Button active state */
    button:active {
      transform: scale(0.98) !important;
    }
  `]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  token: string = '';
  passwordStrength: 'weak' | 'medium' | 'strong' = 'weak';
  passwordStrengthPercentage = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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

    // Watch password changes to calculate strength
    this.resetPasswordForm.get('password')?.valueChanges.subscribe(password => {
      this.calculatePasswordStrength(password);
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  animatePasswordField() {
    // Animation when password field gets focus
    const passwordField = document.querySelector('#passwordField');
    if (passwordField) {
      gsap.from(passwordField, {
        y: 10,
        opacity: 0.8,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    }
  }

  calculatePasswordStrength(password: string): void {
    if (!password) {
      this.passwordStrength = 'weak';
      this.passwordStrengthPercentage = 0;
      return;
    }
    
    let strength = 0;
    
    // Length
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Contains numbers
    if (/\d/.test(password)) strength += 1;
    
    // Contains special chars
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    
    // Contains both lower and upper case
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    
    // Determine strength level
    if (strength <= 2) {
      this.passwordStrength = 'weak';
      this.passwordStrengthPercentage = 33;
    } else if (strength <= 4) {
      this.passwordStrength = 'medium';
      this.passwordStrengthPercentage = 66;
    } else {
      this.passwordStrength = 'strong';
      this.passwordStrengthPercentage = 100;
    }
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

  getPasswordStrengthText(): string {
    switch (this.passwordStrength) {
      case 'weak': return 'Faible';
      case 'medium': return 'Moyen';
      case 'strong': return 'Fort';
      default: return '';
    }
  }

  async onSubmit(): Promise<void> {
    if (this.resetPasswordForm.invalid) {
      this.markAllFieldsAsTouched();
      this.showToast('error', 'Veuillez remplir correctement tous les champs');
      return;
    }

    this.isLoading = true;

    try {
      // Simuler un appel API
      await this.simulateApiCall(this.resetPasswordForm.value);
      
      this.showToast('success', 'Mot de passe réinitialisé avec succès !');
      
      // Attendre que le toast soit visible avant la redirection
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
      
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      this.showToast('error', 'Erreur lors de la réinitialisation du mot de passe');
    } finally {
      this.isLoading = false;
    }
  }

  private async simulateApiCall(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simuler une réponse réussie
        resolve({ success: true, message: 'Mot de passe réinitialisé avec succès' });
      }, 1500);
    });
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.resetPasswordForm.controls).forEach(key => {
      this.resetPasswordForm.get(key)?.markAsTouched();
    });
  }

  private showToast(icon: 'success' | 'error', title: string) {
    if (icon === 'success') {
      this.toastr.success(title, '', {
        timeOut: 4000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true,
        tapToDismiss: true,
        enableHtml: true,
        toastClass: 'custom-toast success-toast'
      });
    } else {
      this.toastr.error(title, '', {
        timeOut: 4000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true,
        tapToDismiss: true,
        enableHtml: true,
        toastClass: 'custom-toast error-toast'
      });
    }
  }
}