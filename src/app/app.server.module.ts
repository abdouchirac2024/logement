import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    // Add a provider to handle browser-only APIs
    { provide: 'REQUEST_IDLE_CALLBACK', useValue: null }
  ]
})
export class AppServerModule { } 