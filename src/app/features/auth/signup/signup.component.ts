import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

interface RegisterResponse {
  message: string;
  token?: string;
  user?: any;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <!-- Three.js Canvas Container -->
      <div #threeContainer class="absolute inset-0 z-0"></div>
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-white/90 to-white/30 z-1"></div>
      
      <!-- Main Content -->
      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10 transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-1">
        <!-- Floating particles -->
        <div class="absolute -top-20 -left-20 w-40 h-40 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <!-- Header with floating animation -->
        <div class="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-center relative overflow-hidden">
          <!-- Animated waves background -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="wave wave1"></div>
            <div class="wave wave2"></div>
            <div class="wave wave3"></div>
          </div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-center mx-auto mb-4 animate-bounce">
              <img src="assets/image/logo/Logo.png" alt="Locato Logo" 
                   class="w-16 h-16 object-contain transition-transform duration-300 hover:rotate-12 hover:scale-110" />
            </div>
            <h1 class="text-2xl font-bold text-white mb-2 animate-fade-in-down">Inscription</h1>
            <p class="text-white text-sm opacity-90 animate-fade-in-up">
            Aujourd'hui est un nouveau jour. Trouvez le logement parfait selon vos envies ou alors publiez vos logements en quelques clics.
          </p>
          </div>
        </div>

        <!-- Progress Bar with animation -->
        <div class="px-6 py-4 bg-gray-50">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Étape {{currentStep}} sur {{totalSteps}} ({{(currentStep / totalSteps) * 100 | number:'1.0-0'}}%)</span>
            <span class="text-sm text-gray-500">{{getStepTitle()}}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500 ease-out" 
                 [style.width.%]="(currentStep / totalSteps) * 100"
                 #progressBar></div>
          </div>
        </div>

        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="p-6 relative">
          <!-- Step 1: Role Selection -->
          <div *ngIf="currentStep === 1" class="space-y-6 animate-fade-in">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Choisissez votre rôle</label>
              <div class="grid grid-cols-2 gap-4">
                <div class="relative">
                  <input type="radio" id="locataire" value="Locataire" formControlName="role" class="sr-only peer">
                  <label for="locataire" 
                         class="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-300 peer-checked:border-red-500 peer-checked:bg-red-50 transition-all duration-300 hover:shadow-md hover:scale-[1.02] peer-checked:scale-[1.03] peer-checked:shadow-lg">
                    <svg class="w-8 h-8 text-gray-400 peer-checked:text-red-500 mb-2 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-700">Locataire</span>
                    <span class="text-xs text-gray-500 text-center mt-1">Chercher un logement</span>
                  </label>
                  <div class="absolute -inset-1 rounded-xl bg-red-500/10 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div class="relative">
                  <input type="radio" id="bailleur" value="Bailleur" formControlName="role" class="sr-only peer">
                  <label for="bailleur" 
                         class="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-300 peer-checked:border-red-500 peer-checked:bg-red-50 transition-all duration-300 hover:shadow-md hover:scale-[1.02] peer-checked:scale-[1.03] peer-checked:shadow-lg">
                    <svg class="w-8 h-8 text-gray-400 peer-checked:text-red-500 mb-2 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-700">Bailleur</span>
                    <span class="text-xs text-gray-500 text-center mt-1">Publier des logements</span>
                  </label>
                  <div class="absolute -inset-1 rounded-xl bg-red-500/10 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Personal Information -->
          <div *ngIf="currentStep === 2" class="space-y-4 animate-fade-in">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <input type="text" formControlName="name" placeholder="Votre nom" 
                         class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:shadow-sm focus:shadow-md">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <input type="text" formControlName="prenom" placeholder="Votre prénom" 
                         class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:shadow-sm focus:shadow-md">
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <input type="email" formControlName="email" placeholder="exemple@email.com" 
                       class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:shadow-sm focus:shadow-md">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <input type="tel" formControlName="telephone" placeholder="+237671178991" 
                       class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:shadow-sm focus:shadow-md">
              </div>
            </div>
          </div>

          <!-- Step 3: Location -->
          <div *ngIf="currentStep === 3" class="space-y-4 animate-fade-in">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ville</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <select formControlName="ville_id" 
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:shadow-sm focus:shadow-md appearance-none bg-white">
                  <option value="">Sélectionnez une ville</option>
                  <option value="1">Douala</option>
                  <option value="2">Yaoundé</option>
                  <option value="3">Bafoussam</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Quartier</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <select formControlName="quartier_id" 
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:shadow-sm focus:shadow-md appearance-none bg-white">
                  <option value="">Sélectionnez un quartier</option>
                  <option value="1">Akwa</option>
                  <option value="2">Bonanjo</option>
                  <option value="3">Deido</option>
                  <option value="4">New Bell</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 4: Specific Information -->
          <div *ngIf="currentStep === 4" class="space-y-4 animate-fade-in">
            <!-- Locataire specific fields -->
            <div *ngIf="signupForm.get('role')?.value === 'Locataire'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Préférences de logement</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                </div>
                <select formControlName="preference" 
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:shadow-sm focus:shadow-md appearance-none bg-white">
                  <option value="">Sélectionnez vos préférences</option>
                  <option value="Studio">Studio</option>
                  <option value="Appartement 1 chambre">Appartement 1 chambre</option>
                  <option value="Appartement 2 chambres">Appartement 2 chambres</option>
                  <option value="Appartement 3 chambres">Appartement 3 chambres</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
            </div>

            <!-- Bailleur specific fields -->
            <div *ngIf="signupForm.get('role')?.value === 'Bailleur'" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Numéro Fiscal</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <input type="text" formControlName="numFiscal" placeholder="123456789" 
                         class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:shadow-sm focus:shadow-md">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <div class="relative">
                  <textarea formControlName="description" rows="3" 
                            placeholder="Décrivez votre activité de bailleur..." 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:shadow-sm focus:shadow-md resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 5: Password -->
          <div *ngIf="currentStep === 5" class="space-y-4 animate-fade-in">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <input [type]="showPassword ? 'text' : 'password'" formControlName="password" 
                       placeholder="Au moins 8 caractères" 
                       class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:shadow-sm focus:shadow-md">
                <button type="button" (click)="togglePassword()" 
                        class="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200">
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
              <div class="h-1 mt-1 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full transition-all duration-500 ease-out" 
                     [ngClass]="{
                       'bg-red-500': passwordStrength === 'weak',
                       'bg-yellow-500': passwordStrength === 'medium',
                       'bg-green-500': passwordStrength === 'strong'
                     }"
                     [style.width.%]="passwordStrengthPercentage"></div>
              </div>
              <p class="text-xs mt-1 text-gray-500" *ngIf="signupForm.get('password')?.value">
                Sécurité: {{passwordStrength | titlecase}} ({{passwordStrengthPercentage}}%)
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <input [type]="showConfirmPassword ? 'text' : 'password'" formControlName="password_confirmation" 
                       placeholder="Confirmez votre mot de passe" 
                       class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:shadow-sm focus:shadow-md">
                <button type="button" (click)="toggleConfirmPassword()" 
                        class="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200">
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
              <div class="flex items-center mt-1" *ngIf="signupForm.get('password_confirmation')?.value && signupForm.get('password')?.value">
                <svg class="w-4 h-4 mr-1" [ngClass]="{
                  'text-green-500': passwordsMatch(),
                  'text-red-500': !passwordsMatch()
                }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        [attr.d]="passwordsMatch() ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'"/>
                </svg>
                <span class="text-xs" [ngClass]="{
                  'text-green-500': passwordsMatch(),
                  'text-red-500': !passwordsMatch()
                }">
                  {{ passwordsMatch() ? 'Les mots de passe correspondent' : 'Les mots de passe ne correspondent pas' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button type="button" (click)="previousStep()" 
                    *ngIf="currentStep > 1"
                    class="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center hover:shadow-md hover:-translate-x-1">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Précédent
            </button>

            <button type="button" (click)="nextStep()" 
                    *ngIf="currentStep < totalSteps"
                    [disabled]="!canProceedToNextStep()"
                    class="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center ml-auto hover:shadow-lg hover:translate-x-1"
                    #nextButton>
              Suivant
              <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>

            <button type="submit" 
                    *ngIf="currentStep === totalSteps"
                    [disabled]="!signupForm.valid"
                    class="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center ml-auto hover:shadow-lg hover:scale-105"
                    #submitButton>
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Créer mon compte
            </button>
          </div>
        </form>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t text-center animate-fade-in-up">
          <div class="mb-4">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-gray-50 text-gray-500">Ou</span>
              </div>
            </div>
          </div>

          <button type="button" 
                  class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 mb-4 hover:shadow-md"
                  #googleButton>
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Inscription avec Google
          </button>

          <p class="text-sm text-gray-600">
            Vous avez déjà un compte ? 
            <a routerLink="/login" class="text-red-500 hover:text-red-600 font-medium transition-colors duration-300">Se connecter</a>
          </p>

          <p class="text-xs text-gray-400 mt-4">
            LOCATO © 2025 TOUS DROITS RÉSERVÉS
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .peer:checked ~ label {
      transform: scale(1.02);
    }
    
    select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
    }

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
      opacity: 0.1;
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

    /* Button pulse animation */
    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
      }
      70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
      }
    }

    .pulse-animation {
      animation: pulse 2s infinite;
    }

    /* Custom toast styles */
    .custom-toast {
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    
    .custom-toast-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: white;
    }
    
    .custom-toast-icon {
      color: white;
    }
    
    .custom-toast-progress {
      background: rgba(255, 255, 255, 0.3);
    }
  `]
})
export class SignupComponent implements AfterViewInit, OnDestroy {
  signupForm: FormGroup;
  currentStep = 1;
  totalSteps = 5;
  showPassword = false;
  showConfirmPassword = false;
  passwordStrength: 'weak' | 'medium' | 'strong' = 'weak';
  passwordStrengthPercentage = 0;
  private apiUrl = 'https://accentprojets.cm/public/api';
  isLoading = false;

  // Three.js variables
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cubes: THREE.Mesh[] = [];
  private animationId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private el: ElementRef,
    private http: HttpClient
  ) {
    this.signupForm = this.fb.group({
      role: ['', Validators.required],
      name: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      ville_id: ['', Validators.required],
      quartier_id: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      preference: [''],
      numFiscal: [''],
      description: ['']
    });

    // Watch role changes to update form validators
    this.signupForm.get('role')?.valueChanges.subscribe(role => {
      this.updateFormValidators(role);
    });

    // Watch password changes to calculate strength
    this.signupForm.get('password')?.valueChanges.subscribe(password => {
      this.calculatePasswordStrength(password);
    });
  }

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.initAnimations();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThreeJS(): void {
    const container = this.el.nativeElement.querySelector('.absolute.inset-0.z-0');

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    // Create floating cubes
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff6b6b,
      transparent: true,
      opacity: 0.7,
      shininess: 100
    });

    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(geometry, material.clone());
      cube.material.color.setHSL(Math.random(), 0.5, 0.5);

      // Random position
      cube.position.x = Math.random() * 40 - 20;
      cube.position.y = Math.random() * 40 - 20;
      cube.position.z = Math.random() * 40 - 20;

      // Random rotation
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;

      // Random scale
      const scale = Math.random() * 0.5 + 0.5;
      cube.scale.set(scale, scale, scale);

      this.cubes.push(cube);
      this.scene.add(cube);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Start animation
    this.animate();
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Rotate cubes
    this.cubes.forEach((cube, i) => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Float up and down
      cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;

      // Pulsate
      const scale = 0.5 + Math.sin(Date.now() * 0.001 + i) * 0.1;
      cube.scale.set(scale, scale, scale);
    });

    this.renderer.render(this.scene, this.camera);
  }

  private initAnimations(): void {
    // GSAP animations for buttons
    const nextButton = this.el.nativeElement.querySelector('#nextButton');
    const submitButton = this.el.nativeElement.querySelector('#submitButton');
    const googleButton = this.el.nativeElement.querySelector('#googleButton');

    if (nextButton) {
      gsap.from(nextButton, {
        x: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "back.out(1.7)"
      });
    }

    if (submitButton) {
      gsap.from(submitButton, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: "elastic.out(1, 0.5)"
      });
    }

    if (googleButton) {
      gsap.from(googleButton, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.5,
        ease: "power2.out"
      });
    }

    // Add hover effects
    const buttons = this.el.nativeElement.querySelectorAll('button');
    buttons.forEach((button: HTMLElement) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      });
    });
  }

  private calculatePasswordStrength(password: string): void {
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

  updateFormValidators(role: string) {
    const preferenceControl = this.signupForm.get('preference');
    const numFiscalControl = this.signupForm.get('numFiscal');
    const descriptionControl = this.signupForm.get('description');

    // Clear all validators first
    preferenceControl?.clearValidators();
    numFiscalControl?.clearValidators();
    descriptionControl?.clearValidators();

    if (role === 'Locataire') {
      preferenceControl?.setValidators([Validators.required]);
    } else if (role === 'Bailleur') {
      numFiscalControl?.setValidators([Validators.required]);
      descriptionControl?.setValidators([Validators.required]);
    }

    // Update validity
    preferenceControl?.updateValueAndValidity();
    numFiscalControl?.updateValueAndValidity();
    descriptionControl?.updateValueAndValidity();
  }

  getStepTitle(): string {
    const titles = {
      1: 'Sélection du rôle',
      2: 'Informations personnelles',
      3: 'Localisation',
      4: 'Informations spécifiques',
      5: 'Sécurité'
    };
    return titles[this.currentStep as keyof typeof titles] || '';
  }

  canProceedToNextStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.signupForm.get('role')?.valid || false;
      case 2:
        return ['name', 'prenom', 'email', 'telephone'].every(field =>
          this.signupForm.get(field)?.valid
        );
      case 3:
        return ['ville_id', 'quartier_id'].every(field =>
          this.signupForm.get(field)?.valid
        );
      case 4:
        const role = this.signupForm.get('role')?.value;
        if (role === 'Locataire') {
          return this.signupForm.get('preference')?.valid || false;
        } else if (role === 'Bailleur') {
          return ['numFiscal', 'description'].every(field =>
            this.signupForm.get(field)?.valid
          );
        }
        return true;
      case 5:
        return ['password', 'password_confirmation'].every(field =>
          this.signupForm.get(field)?.valid
        ) && this.passwordsMatch();
      default:
        return false;
    }
  }

  passwordsMatch(): boolean {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('password_confirmation')?.value;
    return password === confirmPassword;
  }

  nextStep() {
    if (this.canProceedToNextStep()) {
      if (this.currentStep < this.totalSteps) {
        // Animate step transition
        const form = this.el.nativeElement.querySelector('form');
        gsap.to(form, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            this.currentStep++;
            gsap.fromTo(form,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.3 }
            );
          }
        });
      }
    } else {
      this.markFormGroupTouched();
      this.showToast('error', 'Veuillez remplir correctement tous les champs requis');
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      // Animate step transition
      const form = this.el.nativeElement.querySelector('form');
      gsap.to(form, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          this.currentStep--;
          gsap.fromTo(form,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.3 }
          );
        }
      });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    // Add animation to the toggle button
    const button = this.el.nativeElement.querySelector('[aria-label="Toggle password visibility"]');
    gsap.to(button, {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
    // Add animation to the toggle button
    const button = this.el.nativeElement.querySelector('[aria-label="Toggle confirm password visibility"]');
    gsap.to(button, {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  }

  onSubmit() {
    if (this.signupForm.valid && this.passwordsMatch()) {
      this.isLoading = true;

      // Animation du bouton de soumission
      const submitButton = this.el.nativeElement.querySelector('#submitButton');
      gsap.to(submitButton, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // Préparation des données d'inscription
          const formData = {
            name: this.signupForm.get('name')?.value,
            prenom: this.signupForm.get('prenom')?.value,
            email: this.signupForm.get('email')?.value,
            telephone: this.signupForm.get('telephone')?.value,
            password: this.signupForm.get('password')?.value,
            password_confirmation: this.signupForm.get('password_confirmation')?.value,
            role: this.signupForm.get('role')?.value,
            quartier_id: parseInt(this.signupForm.get('quartier_id')?.value),
            ville_id: parseInt(this.signupForm.get('ville_id')?.value)
          };

          // Ajout des champs spécifiques au rôle
          if (formData.role === 'Bailleur') {
            Object.assign(formData, {
              numFiscal: this.signupForm.get('numFiscal')?.value,
              description: this.signupForm.get('description')?.value
            });
          } else if (formData.role === 'Locataire') {
            Object.assign(formData, {
              preference: this.signupForm.get('preference')?.value
            });
          }

          // Appel à l'API
          this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, formData)
            .pipe(
              catchError(error => {
                let errorMessage = 'Une erreur est survenue lors de l\'inscription';
                if (error.error?.message) {
                  errorMessage = error.error.message;
                } else if (error.error?.errors) {
                  // Gestion des erreurs de validation
                  const errors = error.error.errors;
                  errorMessage = Object.values(errors).flat().join('\n');
                }
                this.showToast('error', errorMessage);
                return of(null);
              }),
              finalize(() => {
                this.isLoading = false;
                // Réinitialiser l'animation du bouton
                gsap.to(submitButton, {
                  scale: 1,
                  duration: 0.2
                });
              })
            )
            .subscribe(response => {
              if (response) {
                // Stocker le token si fourni
                if (response.token) {
                  localStorage.setItem('token', response.token);
                }

                // Afficher le message de succès
                this.showToast('success', 'Inscription réussie ! Redirection...');

                // Redirection vers la page de vérification
                setTimeout(() => {
                  this.router.navigate(['/verification']);
                }, 2000);
              }
            });
        }
      });
    } else {
      this.markFormGroupTouched();
      if (!this.passwordsMatch()) {
        this.showToast('error', 'Les mots de passe ne correspondent pas');
      } else {
        this.showToast('error', 'Veuillez remplir correctement tous les champs requis');
      }
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
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
}