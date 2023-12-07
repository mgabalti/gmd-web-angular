import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ToastModule } from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';
import { LoaderService } from '../../services/loader.service';
import { delay } from 'rxjs';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ToastModule, ProgressBarModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private loader: LoaderService) { }

  isLoading = false;
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
