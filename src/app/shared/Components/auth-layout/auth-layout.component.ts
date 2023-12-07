import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderService } from '../../services/loader.service';
import { delay } from 'rxjs';
import { RouterModule } from '@angular/router';
import {ProgressBarModule} from 'primeng/progressbar';
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule,RouterModule, ToastModule, ProgressSpinnerModule, ProgressBarModule],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  isLoading = false;
  constructor(private loader: LoaderService) { }
  ngOnInit(): void {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loader.isLoading
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });
  }
}
