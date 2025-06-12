import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule]
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.resetForm = this.fb.group({
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

  async onSubmit(): Promise<void> {
    if (this.resetForm.invalid) {
      this.markAllFieldsAsTouched();
      this.showToast('error', 'Veuillez remplir correctement tous les champs');
      return;
    }

    this.isLoading = true;

    try {
      // Simuler un appel API
      await this.simulateApiCall(this.resetForm.value);
      
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
    Object.keys(this.resetForm.controls).forEach(key => {
      this.resetForm.get(key)?.markAsTouched();
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getErrorMessage(controlName: string): string {
    const control = this.resetForm.get(controlName);
    if (!control?.errors || !control.touched) return '';

    if (control.errors['required']) {
      return 'Ce champ est requis';
    }
    if (control.errors['minlength']) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (control.errors['pattern']) {
      return 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial';
    }
    if (control.errors['passwordMismatch']) {
      return 'Les mots de passe ne correspondent pas';
    }

    return 'Champ invalide';
  }
} 