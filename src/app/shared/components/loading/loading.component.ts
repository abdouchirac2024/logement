import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loadingService.isLoading$ | async"
         class="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50 z-50 flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm">
     
      <!-- Conteneur principal avec effet glassmorphism -->
      <div class="relative w-48 h-48 mb-12 flex items-center justify-center">
        
        <!-- Onde principale - effet pulsation élégant -->
        <div class="absolute inset-0 bg-gradient-to-r from-red-400/20 to-rose-400/20 rounded-full animate-pulse-elegant shadow-2xl"></div>
        
        <!-- Ondes de propagation avec dégradé -->
        <div class="absolute inset-0 border-2 border-gradient-to-r from-red-400/40 to-rose-400/40 rounded-full animate-ripple-smooth"></div>
        <div class="absolute inset-0 border-2 border-gradient-to-r from-red-300/30 to-rose-300/30 rounded-full animate-ripple-smooth animate-delay-300"></div>
        <div class="absolute inset-0 border border-gradient-to-r from-red-200/20 to-rose-200/20 rounded-full animate-ripple-smooth animate-delay-600"></div>
        
        <!-- Conteneur logo avec ombre portée élégante -->
        <div class="relative z-10 bg-white/80 backdrop-blur-sm rounded-full p-6 shadow-2xl ring-1 ring-black/5">
          <img
            src="assets/iconelocato.png"
            alt="Chargement..."
            class="w-24 h-24 object-contain animate-logo-drop filter drop-shadow-lg"
          />
        </div>
        
        <!-- Particules flottantes décoratives -->
        <div class="absolute top-8 left-8 w-2 h-2 bg-red-300/60 rounded-full animate-float-1"></div>
        <div class="absolute top-16 right-12 w-1.5 h-1.5 bg-rose-400/50 rounded-full animate-float-2"></div>
        <div class="absolute bottom-12 left-16 w-1 h-1 bg-red-200/70 rounded-full animate-float-3"></div>
      </div>
     
      <!-- Section texte modernisée -->
      <div class="text-center space-y-4">
        <h2 class="text-2xl font-light text-gray-800 tracking-wide">
          Chargement en cours
        </h2>
        
        <!-- Barre de progression stylisée -->
        <div class="w-64 h-1 bg-gray-200/50 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-red-400 to-rose-500 rounded-full animate-progress-wave"></div>
        </div>
        
        <!-- Points animés avec style moderne -->
        <div class="flex items-center justify-center space-x-1 mt-6">
          <div class="w-2 h-2 bg-red-400 rounded-full animate-bounce-dot"></div>
          <div class="w-2 h-2 bg-rose-400 rounded-full animate-bounce-dot animate-delay-150"></div>
          <div class="w-2 h-2 bg-red-300 rounded-full animate-bounce-dot animate-delay-300"></div>
        </div>
        
        <!-- Message d'encouragement subtil -->
        <p class="text-sm text-gray-500 font-light mt-4 opacity-80">
          Préparation de votre expérience...
        </p>
      </div>
    </div>
  `,
  styles: [`
    /* Animation d'entrée sophistiquée pour le logo */
    @keyframes logo-entrance {
      0% {
        opacity: 0;
        transform: translateY(-30px) scale(0.8) rotate(-5deg);
        filter: blur(4px);
      }
      50% {
        opacity: 0.8;
        transform: translateY(5px) scale(1.05) rotate(2deg);
        filter: blur(1px);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1) rotate(0deg);
        filter: blur(0);
      }
    }
    
    .animate-logo-entrance {
      animation: logo-entrance 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    /* Effet de pulsation élégant pour le fond */
    @keyframes pulse-elegant {
      0%, 100% {
        transform: scale(0.95);
        opacity: 0.3;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.6;
      }
    }
    
    .animate-pulse-elegant {
      animation: pulse-elegant 4s ease-in-out infinite;
    }

    /* Ondes de propagation fluides */
    @keyframes ripple-smooth {
      0% {
        transform: scale(0.3);
        opacity: 0.8;
        border-width: 3px;
      }
      50% {
        opacity: 0.4;
        border-width: 2px;
      }
      100% {
        transform: scale(2.8);
        opacity: 0;
        border-width: 0px;
      }
    }
    
    .animate-ripple-smooth {
      animation: ripple-smooth 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    /* Barre de progression ondulante */
    @keyframes progress-wave {
      0% {
        transform: translateX(-100%) scaleX(0.1);
      }
      50% {
        transform: translateX(-50%) scaleX(1);
      }
      100% {
        transform: translateX(100%) scaleX(0.1);
      }
    }
    
    .animate-progress-wave {
      animation: progress-wave 3s ease-in-out infinite;
    }

    /* Points rebondissants modernisés */
    @keyframes bounce-dot {
      0%, 80%, 100% {
        transform: translateY(0) scale(1);
        opacity: 0.7;
      }
      40% {
        transform: translateY(-12px) scale(1.2);
        opacity: 1;
      }
    }
    
    .animate-bounce-dot {
      animation: bounce-dot 2s infinite ease-in-out;
    }

    /* Particules flottantes */
    @keyframes float-1 {
      0%, 100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0.6;
      }
      50% {
        transform: translateY(-20px) translateX(10px);
        opacity: 1;
      }
    }
    
    @keyframes float-2 {
      0%, 100% {
        transform: translateY(0px) translateX(0px) rotate(0deg);
        opacity: 0.4;
      }
      50% {
        transform: translateY(-15px) translateX(-8px) rotate(180deg);
        opacity: 0.8;
      }
    }
    
    @keyframes float-3 {
      0%, 100% {
        transform: translateY(0px) scale(1);
        opacity: 0.5;
      }
      50% {
        transform: translateY(-10px) scale(1.5);
        opacity: 0.9;
      }
    }
    
    .animate-float-1 {
      animation: float-1 5s ease-in-out infinite;
    }
    
    .animate-float-2 {
      animation: float-2 4.5s ease-in-out infinite;
    }
    
    .animate-float-3 {
      animation: float-3 4s ease-in-out infinite;
    }

    /* Classes de délai pour les animations */
    .animate-delay-150 {
      animation-delay: 0.15s;
    }
    
    .animate-delay-300 {
      animation-delay: 0.3s;
    }
    
    .animate-delay-600 {
      animation-delay: 0.6s;
    }

    /* Effets de glassmorphism et modernité */
    .backdrop-blur-sm {
      backdrop-filter: blur(4px);
    }
    
    /* Dégradés personnalisés pour les bordures */
    .border-gradient-to-r {
      border-image: linear-gradient(to right, var(--tw-gradient-stops)) 1;
    }

    /* 
     * Animation de "chute et rebond" pour le logo.
     * Donne un effet physique et engageant.
     */
    @keyframes logo-drop {
      0% {
        opacity: 0;
        transform: translateY(-80px) scale(0.8);
      }
      60% {
        opacity: 1;
        transform: translateY(10px) scale(1.05); /* Petit rebond vers le haut */
      }
      80% {
        transform: translateY(-5px) scale(0.98); /* Retour vers le bas */
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1); /* Position finale stable */
      }
    }

    .animate-logo-drop {
      /* forwards: garde l'état final de l'animation */
      animation: logo-drop 1s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
    }
  `]
})
export class LoadingComponent implements OnInit {
  protected loadingService = inject(LoadingService);
  private router = inject(Router);

  ngOnInit() {
    // Afficher le loading
    this.loadingService.show();

    // Attendre 4 secondes avant de rediriger vers home
    setTimeout(() => {
      this.loadingService.hide();
      this.router.navigate(['/home']);
    }, 4000);
  }
}