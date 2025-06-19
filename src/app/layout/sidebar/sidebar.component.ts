import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  get sidebarClasses(): string {
    const baseClasses = 'fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-red-700 to-red-800 text-white shadow-xl transition-all duration-300';
    const widthClasses = this.isCollapsed ? 'w-16' : 'w-64';
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
}