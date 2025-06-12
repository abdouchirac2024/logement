import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-center">
          <div class="flex items-center justify-center mx-auto mb-4">
            <img src="assets/image/logo/Logo.png" alt="Locato Logo" class="w-16 h-16 object-contain" />
          </div>
          <h1 class="text-2xl font-bold text-white mb-2">Mot de passe oublié</h1>
          <p class="text-white text-sm opacity-90">
            Entrez votre email ou téléphone pour recevoir un lien de réinitialisation
          </p>
        </div>

        <!-- Progress Indicator -->
        <div class="px-6 py-4 bg-gray-50">
          <div class="flex items-center justify-center space-x-4">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                   [class]="currentStep >= 1 ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' : 'bg-gray-200 text-gray-500'">
                1
              </div>
              <span class="ml-2 text-sm font-medium" 
                    [class]="currentStep >= 1 ? 'text-red-600' : 'text-gray-500'">
                Identification
              </span>
            </div>
            <div class="w-8 h-1 rounded-full" 
                 [class]="currentStep >= 2 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gray-200'"></div>
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                   [class]="currentStep >= 2 ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' : 'bg-gray-200 text-gray-500'">
                2
              </div>
              <span class="ml-2 text-sm font-medium" 
                    [class]="currentStep >= 2 ? 'text-red-600' : 'text-gray-500'">
                Vérification
              </span>
            </div>
          </div>
        </div>

        <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="p-6">
          <!-- Step 1: Email/Phone Input -->
          <div *ngIf="currentStep === 1" class="space-y-6">
            <!-- Method Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Méthode de récupération</label>
              <div class="grid grid-cols-2 gap-4">
                <div class="relative">
                  <input type="radio" id="email-method" value="email" formControlName="recoveryMethod" class="sr-only peer">
                  <label for="email-method" class="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-300 peer-checked:border-red-500 peer-checked:bg-red-50 transition-all">
                    <svg class="w-8 h-8 text-gray-400 peer-checked:text-red-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-700">Email</span>
                    <span class="text-xs text-gray-500 text-center mt-1">Par email</span>
                  </label>
                </div>
                <div class="relative">
                  <input type="radio" id="phone-method" value="phone" formControlName="recoveryMethod" class="sr-only peer">
                  <label for="phone-method" class="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-300 peer-checked:border-red-500 peer-checked:bg-red-50 transition-all">
                    <svg class="w-8 h-8 text-gray-400 peer-checked:text-red-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-700">Téléphone</span>
                    <span class="text-xs text-gray-500 text-center mt-1">Par SMS</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Email Input -->
            <div *ngIf="forgotPasswordForm.get('recoveryMethod')?.value === 'email'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Adresse email</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <input type="email" formControlName="email" placeholder="exemple@email.com" 
                       class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                       [class.border-red-500]="forgotPasswordForm.get('email')?.invalid && forgotPasswordForm.get('email')?.touched"
                       [class.border-green-500]="forgotPasswordForm.get('email')?.valid && forgotPasswordForm.get('email')?.touched">
                <div *ngIf="forgotPasswordForm.get('email')?.valid && forgotPasswordForm.get('email')?.touched" 
                     class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div *ngIf="forgotPasswordForm.get('email')?.invalid && forgotPasswordForm.get('email')?.touched" 
                   class="mt-1 text-sm text-red-600">
                <span *ngIf="forgotPasswordForm.get('email')?.errors?.['required']">L'email est requis</span>
                <span *ngIf="forgotPasswordForm.get('email')?.errors?.['email']">Format d'email invalide</span>
              </div>
            </div>

            <!-- Phone Input -->
            <div *ngIf="forgotPasswordForm.get('recoveryMethod')?.value === 'phone'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Numéro de téléphone</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <input type="tel" formControlName="telephone" placeholder="+237671178991" 
                       class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                       [class.border-red-500]="forgotPasswordForm.get('telephone')?.invalid && forgotPasswordForm.get('telephone')?.touched"
                       [class.border-green-500]="forgotPasswordForm.get('telephone')?.valid && forgotPasswordForm.get('telephone')?.touched">
                <div *ngIf="forgotPasswordForm.get('telephone')?.valid && forgotPasswordForm.get('telephone')?.touched" 
                     class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div *ngIf="forgotPasswordForm.get('telephone')?.invalid && forgotPasswordForm.get('telephone')?.touched" 
                   class="mt-1 text-sm text-red-600">
                <span *ngIf="forgotPasswordForm.get('telephone')?.errors?.['required']">Le téléphone est requis</span>
                <span *ngIf="forgotPasswordForm.get('telephone')?.errors?.['pattern']">Format de téléphone invalide</span>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" 
                    [disabled]="!canProceedToStep2()"
                    class="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              Envoyer le lien de récupération
            </button>
          </div>

          <!-- Step 2: Success Message -->
          <div *ngIf="currentStep === 2" class="text-center space-y-6">
            <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Email envoyé !</h3>
              <p class="text-gray-600 mb-4">
                Un lien de récupération a été envoyé à 
                <span class="font-medium text-red-600">{{getContactInfo()}}</span>
              </p>
              <p class="text-sm text-gray-500">
                Vérifiez votre boîte de réception et cliquez sur le lien pour réinitialiser votre mot de passe.
              </p>
            </div>

            <!-- Countdown Timer -->
            <div *ngIf="countdown > 0" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm text-yellow-800">
                  Vous pourrez renvoyer un email dans <span class="font-medium">{{countdown}}s</span>
                </span>
              </div>
            </div>

            <!-- Resend Button -->
            <button type="button" (click)="resendEmail()" 
                    [disabled]="countdown > 0"
                    class="w-full px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
              </svg>
              Renvoyer l'email
            </button>
          </div>
        </form>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t text-center">
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

          <div class="space-y-3">
            <p class="text-sm text-gray-600">
              Vous vous souvenez de votre mot de passe ? 
              <a routerLink="/login" class="text-red-500 hover:text-red-600 font-medium">Se connecter</a>
            </p>
            
            <p class="text-sm text-gray-600">
              Vous n'avez pas encore de compte ? 
              <a routerLink="/signup" class="text-red-500 hover:text-red-600 font-medium">S'inscrire</a>
            </p>
          </div>

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
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
    
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  currentStep = 1;
  countdown = 0;
  private countdownInterval: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.forgotPasswordForm = this.fb.group({
      recoveryMethod: ['', Validators.required],
      email: [''],
      telephone: ['']
    });

    // Watch recovery method changes to update validators
    this.forgotPasswordForm.get('recoveryMethod')?.valueChanges.subscribe(method => {
      this.updateFormValidators(method);
    });
  }

  updateFormValidators(method: string) {
    const emailControl = this.forgotPasswordForm.get('email');
    const telephoneControl = this.forgotPasswordForm.get('telephone');

    // Clear all validators first
    emailControl?.clearValidators();
    telephoneControl?.clearValidators();

    if (method === 'email') {
      emailControl?.setValidators([Validators.required, Validators.email]);
      telephoneControl?.setValue('');
    } else if (method === 'phone') {
      telephoneControl?.setValidators([
        Validators.required, 
        Validators.pattern(/^(\+237)?[6-9]\d{8}$/)
      ]);
      emailControl?.setValue('');
    }

    // Update validity
    emailControl?.updateValueAndValidity();
    telephoneControl?.updateValueAndValidity();
  }

  canProceedToStep2(): boolean {
    const method = this.forgotPasswordForm.get('recoveryMethod')?.value;
    if (method === 'email') {
      return this.forgotPasswordForm.get('email')?.valid || false;
    } else if (method === 'phone') {
      return this.forgotPasswordForm.get('telephone')?.valid || false;
    }
    return false;
  }

  getContactInfo(): string {
    const method = this.forgotPasswordForm.get('recoveryMethod')?.value;
    if (method === 'email') {
      return this.forgotPasswordForm.get('email')?.value || '';
    } else if (method === 'phone') {
      return this.forgotPasswordForm.get('telephone')?.value || '';
    }
    return '';
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid && this.canProceedToStep2()) {
      // Simuler un appel API
      const method = this.forgotPasswordForm.get('recoveryMethod')?.value;
      const contact = this.getContactInfo();
      
      // Simuler un délai de traitement
      this.showToast('info', 'Envoi en cours...');
      
      setTimeout(() => {
        this.currentStep = 2;
        this.startCountdown();
        this.showToast('success', `Lien de récupération envoyé ${method === 'email' ? 'par email' : 'par SMS'}`);
      }, 1500);
    } else {
      this.markFormGroupTouched();
      this.showToast('error', 'Veuillez remplir correctement tous les champs requis');
    }
  }

  resendEmail() {
    if (this.countdown === 0) {
      const method = this.forgotPasswordForm.get('recoveryMethod')?.value;
      this.showToast('info', 'Renvoi en cours...');
      
      setTimeout(() => {
        this.startCountdown();
        this.showToast('success', `Lien de récupération renvoyé ${method === 'email' ? 'par email' : 'par SMS'}`);
      }, 1000);
    }
  }

  private startCountdown() {
    this.countdown = 60; // 60 seconds countdown
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  private markFormGroupTouched() {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
    });
  }

  private showToast(icon: 'success' | 'error' | 'info', title: string) {
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
      background: icon === 'success' ? '#10B981' : icon === 'error' ? '#E0252C' : '#3B82F6',
      color: '#ffffff',
      iconColor: '#ffffff',
      padding: '1rem 1.5rem'
    });

    Toast.fire({
      icon: icon,
      title: title
    });
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}