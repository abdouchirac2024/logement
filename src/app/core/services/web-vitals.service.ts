import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback: (handle: number) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WebVitalsService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Safe wrapper for requestIdleCallback
  requestIdleCallback(callback: IdleRequestCallback, options?: IdleRequestOptions): number {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        return window.requestIdleCallback(callback, options);
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        const timeout = options?.timeout || 50;
        const handle = setTimeout(() => {
          callback({
            didTimeout: false,
            timeRemaining: () => 15
          });
        }, timeout);
        return handle as unknown as number;
      }
    }
    // Return a dummy ID for server-side
    return 0;
  }

  // Safe wrapper for cancelIdleCallback
  cancelIdleCallback(handle: number): void {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(handle);
      } else {
        // Use ReturnType<typeof setTimeout> for the timeout handle type
        clearTimeout(handle as unknown as ReturnType<typeof setTimeout>);
      }
    }
  }
} 