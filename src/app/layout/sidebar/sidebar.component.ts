import { Component, Input, Output, EventEmitter } from '@angular/core'; // Import Output and EventEmitter
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Overlay pour mobile -->
    <div
      *ngIf="isOpen && isMobile"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      (click)="requestCloseSidebar()"
    ></div>

    <!-- Sidebar -->
    <aside [class]="sidebarClasses">
      <!-- Header avec logo -->
      <div class="flex items-center justify-between p-4 border-b border-red-600">
        <div class="flex items-center">
          <img src="assets/image/logo/Logo.png" alt="Locato Logo" class="h-10 w-10">
          <span class="ml-3 text-xl font-bold text-white" [class.hidden]="isCollapsed">Locato</span>
        </div>
        <button
          class="lg:hidden text-white hover:bg-red-600 p-1 rounded"
          (click)="requestCloseSidebar()"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Navigation principale -->
      <nav class="flex-1 px-4 py-6 overflow-y-auto sidebar-nav-scrollable">
        <ul class="space-y-2">
          <li>
            <a
              href="#dashboard"
              class="flex items-center p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Dashboard' : ''"
            >
              <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
              <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Dashboard</span>
            </a>
          </li>

          <li>
            <button
              (click)="toggleLogementDropdown()"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Logement' : ''"
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Logement</span>
              </div>
              <svg
                *ngIf="!isCollapsed"
                class="w-4 h-4 text-white transition-transform duration-200"
                [class.rotate-180]="showLogementDropdown"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <ul *ngIf="showLogementDropdown && !isCollapsed" class="ml-8 mt-2 space-y-1">
              <li>
                <a href="#liste" class="flex items-center justify-between p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">
                  <span>Liste</span>
                  <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">890</span>
                </a>
              </li>
              <li>
                <a href="#type" class="flex items-center justify-between p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">
                  <span>Type</span>
                  <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">06</span>
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#utilisateurs"
              class="flex items-center p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Utilisateurs' : ''"
            >
              <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Utilisateurs</span>
            </a>
          </li>

          <li>
            <a
              href="#annonces"
              class="flex items-center p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Annonces' : ''"
            >
              <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7M9 3V4H15V3H9M7 6V19H17V6H7Z"/>
              </svg>
              <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Annonces</span>
            </a>
          </li>

          <li>
            <button
              (click)="toggleLocalisationDropdown()"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Localisation' : ''"
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Localisation</span>
              </div>
              <svg
                *ngIf="!isCollapsed"
                class="w-4 h-4 text-white transition-transform duration-200"
                [class.rotate-180]="showLocalisationDropdown"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <ul *ngIf="showLocalisationDropdown && !isCollapsed" class="ml-8 mt-2 space-y-1">
              <li><a href="#pays" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Pays</a></li>
              <li><a href="#villes" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Villes</a></li>
              <li><a href="#quartiers" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Quartiers</a></li>
            </ul>
          </li>

          <li>
            <a
              href="#contrats"
              class="flex items-center p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Contrats' : ''"
            >
              <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Contrats</span>
            </a>
          </li>

          <li>
            <a
              href="#avis"
              class="flex items-center p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Avis' : ''"
            >
              <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
              </svg>
              <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Avis</span>
            </a>
          </li>

          <li>
            <a
              href="#visites"
              class="flex items-center p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Visites' : ''"
            >
              <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V8H19V19M19,6H5V5H19V6Z"/>
              </svg>
              <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Visites</span>
            </a>
          </li>

          <li>
            <a
              href="#journaux"
              class="flex items-center p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Journaux des avis' : ''"
            >
              <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16,9H21.5L16,3.5V9M7,2H17L23,8V18A2,2 0 0,1 21,20H7C5.89,20 5,19.1 5,18V4A2,2 0 0,1 7,2M3,6V22H21V24H3A2,2 0 0,1 1,22V6H3Z"/>
              </svg>
              <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Journaux</span>
            </a>
          </li>

          <li>
            <button
              (click)="toggleStatistiquesDropdown()"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Statistiques' : ''"
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z"/>
                </svg>
                <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Statistiques</span>
              </div>
              <svg
                *ngIf="!isCollapsed"
                class="w-4 h-4 text-white transition-transform duration-200"
                [class.rotate-180]="showStatistiquesDropdown"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <ul *ngIf="showStatistiquesDropdown && !isCollapsed" class="ml-8 mt-2 space-y-1">
              <li><a href="#locataires" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Locataires</a></li>
              <li><a href="#proprietaire" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Propriétaires</a></li>
              <li><a href="#taux-de-conversation" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Taux de conversation</a></li>
              <li><a href="#revenue" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Revenue</a></li>
              <li><a href="#contrats" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Contrats</a></li>
            </ul>
          </li>

          <li>
            <button
              (click)="toggleParametresDropdown()"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Paramètres' : ''"
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                </svg>
                <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Paramètres</span>
              </div>
              <svg
                *ngIf="!isCollapsed"
                class="w-4 h-4 text-white transition-transform duration-200"
                [class.rotate-180]="showParametresDropdown"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <ul *ngIf="showParametresDropdown && !isCollapsed" class="ml-8 mt-2 space-y-1">
              <li><a href="#profile" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Profile</a></li>
              <li><a href="#generaux" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Généraux</a></li>
              <li><a href="#apparence" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Apparence</a></li>
              <li><a href="#communication" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Communication</a></li>
              <li><a href="#acces-securite" class="block p-2 rounded-lg hover:bg-red-600 text-gray-200 hover:text-white">Accès & Sécurité</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <!-- Section Support -->
      <div class="border-t border-red-600 p-4">
        <h3 class="text-white font-semibold mb-4 uppercase text-sm tracking-wide" [class.hidden]="isCollapsed">Support</h3>
        <ul class="space-y-2">
          <li>
            <a
              href="#messages"
              class="flex items-center justify-between p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Messages' : ''"
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Messages</span>
              </div>
              <span *ngIf="!isCollapsed" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">8</span>
            </a>
          </li>
          <li>
            <a
              href="#inbox"
              class="flex items-center p-3 rounded-lg hover:bg-red-600 transition-colors group"
              [title]="isCollapsed ? 'Inbox' : ''"
            >
              <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H4.99c-1.11 0-1.99.89-1.99 2L3 19c0 1.1.88 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"/>
              </svg>
              <span class="ml-3 text-white transition-all duration-300" [class.hidden]="isCollapsed">Inbox</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Bouton de réduction (desktop seulement) -->
      <div class="hidden lg:block border-t border-red-600 p-4">
        <button
          (click)="toggleCollapse()"
          class="w-full flex items-center justify-center p-2 rounded-lg hover:bg-red-600 transition-colors"
          [title]="isCollapsed ? 'Étendre la sidebar' : 'Réduire la sidebar'"
        >
          <svg
            class="w-5 h-5 text-white transition-transform duration-200"
            [class.rotate-180]="isCollapsed"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
          </svg>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .rotate-180 {
      transform: rotate(180deg);
    }

    :host {
      display: contents;
    }

    aside {
      transition: all 0.3s ease-in-out;
    }

    @media (max-width: 1024px) { /* Corresponds to lg breakpoint */
      /* Base mobile state is handled by Tailwind classes in sidebarClasses getter */
    }

    .tooltip {
      position: relative;
    }

    .tooltip::after {
      content: attr(title);
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
      z-index: 1000;
      margin-left: 8px;
    }

    .tooltip:hover::after {
      opacity: 1;
    }

    /* Styles to hide scrollbar but allow scrolling */
    .sidebar-nav-scrollable {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    .sidebar-nav-scrollable::-webkit-scrollbar {
      display: none;  /* Safari and Chrome */
    }
  `]
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;
  @Input() isMobile: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>(); // Matches (closeSidebar) in parent

  showLogementDropdown: boolean = false;
  showLocalisationDropdown: boolean = false;
  showStatistiquesDropdown: boolean = false;
  showParametresDropdown: boolean = false;
  isCollapsed: boolean = false;

  get sidebarClasses(): string {
    const baseClasses = 'fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-red-700 to-red-800 text-white shadow-xl transition-all duration-300';
    const widthClasses = this.isCollapsed ? 'w-16' : 'w-64'; // w-16 for collapsed, w-64 for expanded
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
    this.closeSidebar.emit(); // Emit event to parent
  }
}