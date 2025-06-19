import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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
}