import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { AppComponent } from './app.component'; // Removed as AppComponent is now standalone
// import { HomeComponent } from './features/home/home.component'; // Removed as HomeComponent is now standalone
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    // AppComponent, // Removed
    // HomeComponent // Removed
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  // bootstrap: [AppComponent] // Removed
})
export class AppModule { } 