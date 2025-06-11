import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">
            Locato
          </h1>
          
          <div class="space-y-6">
            <div class="bg-blue-50 border-l-4 border-primary p-4">
              <h2 class="text-2xl font-semibold text-primary mb-2">
                Welcome to Locato
              </h2>
              <p class="text-gray-700">
                Your trusted platform for location-based services.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div class="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Frontend</h3>
                <p class="text-gray-600">Built with Angular and Tailwind CSS</p>
                <button class="btn btn-primary mt-4">Learn More</button>
              </div>

              <div class="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Backend</h3>
                <p class="text-gray-600">Powered by Laravel API</p>
                <button class="btn btn-secondary mt-4" routerLink="/login">Connect</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    this.title.setTitle('Accueil - Locato');
    this.meta.updateTag({ name: 'description', content: 'Bienvenue sur Locato, votre plateforme de services basés sur la localisation.' });
  }
} 