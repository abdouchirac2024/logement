import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    // La logique de navigation peut être ajoutée ici si nécessaire
  }
}