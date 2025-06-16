import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule]
})
export class VerificationComponent implements OnInit {
  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;
  
  verificationForm!: FormGroup;
  verificationType: 'email' | 'phone' = 'email';
  isLoading = false;
  codeControls = ['code1', 'code2', 'code3', 'code4'];

  // Getters pour les contrôles du formulaire
  get emailControl(): AbstractControl | null {
    return this.verificationForm.get('email');
  }

  get phoneControl(): AbstractControl | null {
    return this.verificationForm.get('phone');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.verificationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
      code1: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      code2: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      code3: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      code4: ['', [Validators.required, Validators.pattern(/^\d$/)]]
    });

    // Désactiver les champs selon le type de vérification
    this.updateValidators();
  }

  // Validator personnalisé pour le numéro de téléphone français
  phoneValidator(control: AbstractControl): {[key: string]: any} | null {
    if (!control.value) {
      return null;
    }
    
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    const cleanPhone = control.value.replace(/\s/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
      return { 'invalidPhone': true };
    }
    
    return null;
  }

  switchToEmail(): void {
    this.verificationType = 'email';
    this.updateValidators();
    this.clearForm();
  }

  switchToPhone(): void {
    this.verificationType = 'phone';
    this.updateValidators();
    this.clearForm();
  }

  updateValidators(): void {
    const emailControl = this.verificationForm.get('email');
    const phoneControl = this.verificationForm.get('phone');

    if (this.verificationType === 'email') {
      emailControl?.setValidators([Validators.required, Validators.email]);
      phoneControl?.clearValidators();
    } else {
      phoneControl?.setValidators([Validators.required, this.phoneValidator]);
      emailControl?.clearValidators();
    }

    emailControl?.updateValueAndValidity();
    phoneControl?.updateValueAndValidity();
  }

  clearForm(): void {
    // Réinitialiser seulement les champs email/phone
    this.verificationForm.patchValue({
      email: '',
      phone: ''
    });
    
    // Marquer les champs comme non touchés
    this.verificationForm.get('email')?.markAsUntouched();
    this.verificationForm.get('phone')?.markAsUntouched();
  }

  formatPhoneNumber(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    // Limiter à 10 chiffres
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    
    // Formatter avec des espaces
    if (value.length >= 2) {
      value = value.replace(/(\d{2})(?=\d)/g, '$1 ');
    }
    
    event.target.value = value;
    this.verificationForm.patchValue({
      phone: value
    });
  }

  onCodeInput(event: any, index: number): void {
    const value = event.target.value;
    
    // Permettre seulement les chiffres
    if (!/^\d$/.test(value) && value !== '') {
      event.target.value = '';
      return;
    }

    // Passer au champ suivant si un chiffre est entré
    if (value && index < this.codeControls.length - 1) {
      const nextInput = this.codeInputs.toArray()[index + 1];
      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    // Gérer la touche Backspace
    if (event.key === 'Backspace') {
      const currentInput = event.target as HTMLInputElement;
      
      if (!currentInput.value && index > 0) {
        // Si le champ est vide, aller au champ précédent
        const prevInput = this.codeInputs.toArray()[index - 1];
        if (prevInput) {
          prevInput.nativeElement.focus();
        }
      }
    }
    
    // Gérer les flèches
    if (event.key === 'ArrowLeft' && index > 0) {
      const prevInput = this.codeInputs.toArray()[index - 1];
      if (prevInput) {
        prevInput.nativeElement.focus();
      }
    }
    
    if (event.key === 'ArrowRight' && index < this.codeControls.length - 1) {
      const nextInput = this.codeInputs.toArray()[index + 1];
      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    
    if (pastedData && /^\d{4}$/.test(pastedData)) {
      // Si c'est un code de 4 chiffres, le distribuer dans les champs
      for (let i = 0; i < 4; i++) {
        this.verificationForm.patchValue({
          [this.codeControls[i]]: pastedData[i]
        });
      }
      
      // Focuser sur le dernier champ
      const lastInput = this.codeInputs.toArray()[3];
      if (lastInput) {
        lastInput.nativeElement.focus();
      }
    }
  }

  getVerificationCode(): string {
    return this.codeControls
      .map(control => this.verificationForm.get(control)?.value || '')
      .join('');
  }

  isFormValid(): boolean {
    // Vérifier que le champ email/phone est valide selon le type
    const contactValid = this.verificationType === 'email' 
      ? !!this.verificationForm.get('email')?.valid 
      : !!this.verificationForm.get('phone')?.valid;
    
    // Vérifier que tous les champs de code sont remplis
    const codeValid = this.codeControls.every(control => 
      !!this.verificationForm.get(control)?.valid
    );
    
    return contactValid && codeValid;
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

  async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      this.markAllFieldsAsTouched();
      this.showToast('error', 'Veuillez remplir correctement tous les champs');
      return;
    }

    this.isLoading = true;

    try {
      const verificationData = {
        type: this.verificationType,
        contact: this.verificationType === 'email' 
          ? this.verificationForm.get('email')?.value 
          : this.verificationForm.get('phone')?.value,
        code: this.getVerificationCode()
      };

      console.log('Données de vérification:', verificationData);

      // Simuler un appel API
      await this.simulateApiCall(verificationData);
      
      this.showToast('success', 'Vérification réussie !');
      
      // Attendre que le toast soit visible avant la redirection
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
      
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      this.showToast('error', error instanceof Error ? error.message : 'Code de vérification invalide');
      this.handleVerificationError(error);
    } finally {
      this.isLoading = false;
    }
  }

  private async simulateApiCall(data: any): Promise<any> {
    // Simulation d'un appel API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simuler une réponse réussie ou un échec
        if (data.code === '1234') {
          resolve({ success: true, message: 'Vérification réussie' });
        } else {
          reject(new Error('Code de vérification invalide'));
        }
      }, 2000);
    });
  }

  private handleVerificationError(error: any): void {
    // Gérer les erreurs de vérification
    alert('Erreur: ' + (error.message || 'Code de vérification invalide'));
    
    // Effacer les champs de code en cas d'erreur
    this.codeControls.forEach(control => {
      this.verificationForm.patchValue({ [control]: '' });
    });
    
    // Focuser sur le premier champ de code
    const firstInput = this.codeInputs.toArray()[0];
    if (firstInput) {
      firstInput.nativeElement.focus();
    }
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.verificationForm.controls).forEach(key => {
      this.verificationForm.get(key)?.markAsTouched();
    });
  }

  async resendCode(): Promise<void> {
    const contact = this.verificationType === 'email' 
      ? this.verificationForm.get('email')?.value 
      : this.verificationForm.get('phone')?.value;

    if (!contact) {
      this.showToast('error', `Veuillez d'abord entrer votre ${this.verificationType === 'email' ? 'email' : 'numéro de téléphone'}`);
      return;
    }

    try {
      console.log(`Renvoi du code vers ${this.verificationType}:`, contact);
      
      // Simuler l'envoi du code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.showToast('success', 'Un nouveau code de vérification a été envoyé');
      
      // Effacer les champs de code
      this.codeControls.forEach(control => {
        this.verificationForm.patchValue({ [control]: '' });
      });
      
    } catch (error) {
      console.error('Erreur lors du renvoi du code:', error);
      this.showToast('error', 'Erreur lors du renvoi du code. Veuillez réessayer.');
    }
  }

  // Méthode pour vérifier si le code est complet
  isCodeComplete(): boolean {
    return this.codeControls.every(control => 
      this.verificationForm.get(control)?.valid
    );
  }
}