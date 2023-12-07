import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  storage =  window.sessionStorage; 
  public clean(): void {
    this.storage.clear();
  }

  public get accessToken() {
    return  this.storage.getItem('AccessToken') ?? '';
  }

  public set accessToken(token: string | any) {
    this.storage.setItem('AccessToken', token);
  }
}
