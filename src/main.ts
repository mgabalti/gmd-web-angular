import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { HttpRequestsHandlerInterceptor } from './app/appInterceptor/http-requests-handler.interceptor';


bootstrapApplication(AppComponent, {
    providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestsHandlerInterceptor,
      multi: true
    },
    provideHttpClient(), MessageService, importProvidersFrom(BrowserModule, BrowserAnimationsModule, AppRoutingModule)]
}).catch(err => console.error(err));
