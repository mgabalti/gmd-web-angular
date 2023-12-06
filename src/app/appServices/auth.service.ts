import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHandler } from '../shared/services/api-handler.service';
import { Subscription, interval, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AUTH_API_ENDPOINTS } from '../shared/Constants/api-endpoint-url';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from '../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiHandler {
  private refreshTokenTimeout: Subscription | undefined;
  constructor(myHttpClient: HttpClient,
    private router: Router, private storageService: StorageService) {
    super(myHttpClient);
  }

  public login(credentials: {
    email: string;
    password: string;
  }) {
    return this.post(environment.apiUrl + AUTH_API_ENDPOINTS.Login, credentials)
  }

  public get getUserData(): any {
    return jwtDecode(this.storageService.accessToken) ?? ''
  }

  public get loginUserId() {
    return this.getUserData?.user_id;
  }
}

