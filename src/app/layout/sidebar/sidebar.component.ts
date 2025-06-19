import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html', // Modifié
  styleUrls: ['./sidebar.component.scss']  // Modifié
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;
  @Input() isMobile: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();

  showLogementDropdown: boolean = false;
  showLocalisationDropdown: boolean = false;
  showStatistiquesDropdown: boolean = false;
  showParametresDropdown: boolean = false;
  isCollapsed: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  // La sidebar ne se réduit que si l'utilisateur clique sur le bouton (isCollapsed),
  // jamais automatiquement selon la taille de la fenêtre.
  get sidebarClasses(): string {
    const baseClasses = 'fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-red-700 to-red-800 text-white shadow-xl transition-all duration-300';
    // Largeur contrôlée uniquement par isCollapsed
    const widthClasses = this.isCollapsed ? 'w-16' : 'w-64';
    // Responsive mobile : affichage/masquage selon isMobile/isOpen
    const mobileClasses = this.isMobile ? (this.isOpen ? 'translate-x-0' : '-translate-x-full') : 'lg:translate-x-0';

    return `${baseClasses} ${widthClasses} ${mobileClasses}`;
  }

  toggleLogementDropdown() {
    if (!this.isCollapsed) {
      this.showLogementDropdown = !this.showLogementDropdown;
    }
  }

  toggleLocalisationDropdown() {
    if (!this.isCollapsed) {
      this.showLocalisationDropdown = !this.showLocalisationDropdown;
    }
  }

  toggleStatistiquesDropdown() {
    if (!this.isCollapsed) {
      this.showStatistiquesDropdown = !this.showStatistiquesDropdown;
    }
  }

  toggleParametresDropdown() {
    if (!this.isCollapsed) {
      this.showParametresDropdown = !this.showParametresDropdown;
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.showLogementDropdown = false;
      this.showLocalisationDropdown = false;
      this.showStatistiquesDropdown = false;
      this.showParametresDropdown = false;
    }
  }

  requestCloseSidebar() {
    this.closeSidebar.emit();
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