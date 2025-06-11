import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopbarComponent, SidebarComponent],
  template: `
    <div class="flex h-screen bg-gray-50 overflow-hidden">
      <!-- Sidebar -->
      <app-sidebar
        [isOpen]="sidebarOpen"
        [isMobile]="isMobile"
        (closeSidebar)="closeSidebar()"
      ></app-sidebar>

      <!-- Main content area -->
      <div class="flex-1 flex flex-col overflow-hidden" [class.lg:ml-0]="true">
        <!-- Topbar -->
        <app-topbar (mobileMenuToggle)="toggleSidebar()"></app-topbar> <!-- Removed problematic comment -->

        <!-- Main content -->
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <!-- Content wrapper with proper padding -->
          <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <!-- Breadcrumb navigation -->
            <nav class="flex mb-6" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                  <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-600">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Accueil
                  </a>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Dashboard</span>
                  </div>
                </li>
              </ol>
            </nav>

            <!-- Page title -->
            <div class="mb-8">
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p class="text-gray-600">Bienvenue sur votre tableau de bord Locato</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <!-- Card 1 -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Logements</p>
                    <p class="text-2xl font-bold text-gray-900">890</p>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="flex items-center">
                    <span class="text-sm text-green-600 font-medium">+12%</span>
                    <span class="text-sm text-gray-500 ml-2">ce mois</span>
                  </div>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Utilisateurs</p>
                    <p class="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="flex items-center">
                    <span class="text-sm text-green-600 font-medium">+5%</span>
                    <span class="text-sm text-gray-500 ml-2">ce mois</span>
                  </div>
                </div>
              </div>

              <!-- Card 3 -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Contrats</p>
                    <p class="text-2xl font-bold text-gray-900">456</p>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="flex items-center">
                    <span class="text-sm text-red-600 font-medium">-2%</span>
                    <span class="text-sm text-gray-500 ml-2">ce mois</span>
                  </div>
                </div>
              </div>

              <!-- Card 4 -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Revenus</p>
                    <p class="text-2xl font-bold text-gray-900">€45,678</p>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="flex items-center">
                    <span class="text-sm text-green-600 font-medium">+8%</span>
                    <span class="text-sm text-gray-500 ml-2">ce mois</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Charts and Recent Activity -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <!-- Chart placeholder -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Évolution des locations</h3>
                <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p class="text-gray-500">Graphique des statistiques</p>
                </div>
              </div>

              <!-- Recent activity -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                <div class="space-y-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-900">Nouveau contrat signé</p>
                      <p class="text-xs text-gray-500">Il y a 2 heures</p>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-900">Nouveau logement ajouté</p>
                      <p class="text-xs text-gray-500">Il y a 4 heures</p>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-900">Visite programmée</p>
                      <p class="text-xs text-gray-500">Il y a 6 heures</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Router outlet for nested routes -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <router-outlet></router-outlet>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
    }

    @media (max-width: 640px) {
      .container {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }

    /* Smooth transitions */
    * {
      transition: all 0.2s ease-in-out;
    }

    /* Custom scrollbar - Global, you might want to scope this if not desired globally */
    /* Commenting out global scrollbar style, as sidebar has its own now */
    /*
    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
    */
  `]
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  sidebarOpen: boolean = false;
  isMobile: boolean = false;

  constructor() {}

  ngOnInit() {
    this.checkScreenSize();
  }

  ngOnDestroy() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const previousIsMobile = this.isMobile;
    this.isMobile = window.innerWidth < 1024; // Tailwind 'lg' breakpoint

    // If resizing from mobile to desktop, and sidebar was open, close it.
    if (!this.isMobile && previousIsMobile && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
    // If resizing from desktop to mobile, sidebar state (closed) is maintained.
  }

  toggleSidebar() {
    // This method is called by the topbar's hamburger button (which is only visible on mobile)
    // or potentially other controls in the future.
    if (this.isMobile) {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }

  closeSidebar() {
    // This method is called by the sidebar when it wants to be closed (e.g., overlay click)
    if (this.isMobile && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }
}