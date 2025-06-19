import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html', // Modifié
  styleUrls: ['./topbar.component.scss'] // Modifié
})
export class TopbarComponent {
  @Output() mobileMenuToggle = new EventEmitter<void>();

  showUserMenu: boolean = false;
  showMobileMenu: boolean = false;
  showMobileSearch: boolean = false;

  userName: string = '';
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    // Forcer le nom et le rôle pour la démo
    this.userName = 'help digi';
    this.userRole = 'super admin';
    // Si tu veux garder la logique API, décommente ci-dessous :
    // this.authService.getCurrentUser().subscribe({
    //   next: (user) => {
    //     this.userName = user?.name || 'help digi';
    //     this.userRole = user?.role || 'super admin';
    //   },
    //   error: () => {
    //     this.userName = 'help digi';
    //     this.userRole = 'super admin';
    //   }
    // });
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
    this.mobileMenuToggle.emit();
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
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

  handleLogout() {
    try {
      this.authService.logout();
      this.showToast('success', 'Déconnexion réussie !');
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 1000);
    } catch (error) {
      this.showToast('error', 'Erreur lors de la déconnexion.');
    }
  }
}