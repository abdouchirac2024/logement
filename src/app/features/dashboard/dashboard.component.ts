import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-4">Dashboard Content</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class DashboardComponent {

} 