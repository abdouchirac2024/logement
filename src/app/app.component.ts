import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm">
        <nav class="container mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-900">Locato</h1>
            <div class="space-x-4">
              <a href="#" class="text-gray-600 hover:text-primary">Home</a>
              <a href="#" class="text-gray-600 hover:text-primary">About</a>
              <a href="#" class="text-gray-600 hover:text-primary">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>

      <footer class="bg-gray-800 text-white py-8">
        <div class="container mx-auto px-4">
          <p class="text-center">&copy; 2024 Locato. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'locato';
} 