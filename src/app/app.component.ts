import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpRequestsHandlerInterceptor } from './appInterceptor/http-requests-handler.interceptor';
import { SignalrNotificationService } from './shared/services/signalr-notification.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  constructor(private notificationService: SignalrNotificationService) { } 
  ngOnInit(): void {
    this.notificationService.startConnection();
  }
  title = 'gmd-web';
}
