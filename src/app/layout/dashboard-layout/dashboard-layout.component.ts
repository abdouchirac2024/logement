import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopbarComponent, SidebarComponent],
  templateUrl: './dashboard-layout.component.html', // Modifié
  styleUrls: ['./dashboard-layout.component.scss']   // Modifié
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  sidebarOpen: boolean = false;
  isMobile: boolean = false;

  constructor() {}

  ngOnInit() {
    this.checkScreenSize();
  }

  ngOnDestroy() {
    // Si vous aviez des abonnements à désinscrire ou des écouteurs d'événements à retirer,
    // ce serait ici.
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const previousIsMobile = this.isMobile;
    this.isMobile = window.innerWidth < 1024; // Tailwind 'lg' breakpoint

    if (!this.isMobile && previousIsMobile && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }

  closeSidebar() {
    if (this.isMobile && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }
}