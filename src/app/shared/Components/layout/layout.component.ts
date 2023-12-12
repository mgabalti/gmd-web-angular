import { Component, Injector, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ToastModule } from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';
import { LoaderService } from '../../services/loader.service';
import { SignalrNotificationService } from '../../services/signalr-notification.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ToastModule, ProgressBarModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [SignalrNotificationService]
})
export class LayoutComponent implements OnInit {
  constructor(private injector: Injector, private loader: LoaderService, private notificationService: SignalrNotificationService) { }
  isLoading = false;
  ngOnInit(): void {
    this.listenToLoading();
    this.notificationService.startConnection();
  }
  listenToLoading(): void {
    effect(() => {
      this.isLoading = this.loader.isLoading();
    }, {injector: this.injector});
  }
}
