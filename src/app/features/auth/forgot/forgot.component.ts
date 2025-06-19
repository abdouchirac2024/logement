import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  isLoading = false;
  verificationType: 'email' | 'phone' = 'email';
  private readonly API_URL = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      login: ['', [Validators.required]],
      type: ['email']
    });
  }

  ngOnInit() {
    // Surveiller les changements du type de vérification
    this.forgotForm.get('type')?.valueChanges.subscribe(type => {
      this.verificationType = type;
      this.updateValidation();
    });
  }

  private updateValidation() {
    const loginControl = this.forgotForm.get('login');
    if (this.verificationType === 'email') {
      loginControl?.setValidators([Validators.required, Validators.email]);
    } else {
      loginControl?.setValidators([Validators.required, Validators.pattern(/^[0-9]{9,}$/)]);
    }
    loginControl?.updateValueAndValidity();
  }

  switchToEmail() {
    this.verificationType = 'email';
    this.forgotForm.patchValue({ type: 'email' });
  }

  switchToPhone() {
    this.verificationType = 'phone';
    this.forgotForm.patchValue({ type: 'phone' });
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
      if (this.forgotForm.invalid) {
        this.forgotForm.markAllAsTouched();
        this.showToast('error', 'Veuillez remplir correctement tous les champs');
        return;
      }

      this.isLoading = true;
      const data = {
        login: this.forgotForm.value.login,
        type: this.verificationType
      };

      // Appel à l'API pour la réinitialisation du mot de passe
      this.http.post(`${this.API_URL}/auth/forgot-password`, data).subscribe({
        next: (response: any) => {
          this.showToast('success', 'Un lien de réinitialisation a été envoyé à votre ' +
            (this.verificationType === 'email' ? 'email' : 'numéro de téléphone'));

          // Stocker le login dans le localStorage pour la page de réinitialisation
          localStorage.setItem('reset_login', this.forgotForm.value.login);
          localStorage.setItem('reset_type', this.verificationType);

          // Ne pas rediriger automatiquement, laisser l'utilisateur sur la page
          // La redirection se fera via le lien reçu par email/téléphone
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Une erreur est survenue lors de l\'envoi du lien de réinitialisation';
          this.showToast('error', errorMessage);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } catch (error) {
      this.showToast('error', error instanceof Error ? error.message : 'Une erreur est survenue');
      this.isLoading = false;
    }
  }
}