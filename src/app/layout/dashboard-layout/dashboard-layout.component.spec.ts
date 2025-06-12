import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'; // Important pour router-outlet

import { DashboardLayoutComponent } from './dashboard-layout.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterOutlet, // Si utilisé directement dans le template, sinon RouterTestingModule suffit
        RouterTestingModule, // Pour <router-outlet>
        DashboardLayoutComponent, // Component à tester (standalone)
        TopbarComponent,          // Dépendance standalone
        SidebarComponent          // Dépendance standalone
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});