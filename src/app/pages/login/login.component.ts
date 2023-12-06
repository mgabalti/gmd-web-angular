import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/appServices/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ButtonModule, InputTextModule, CardModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
     private storageService: StorageService,
     private toastService: ToastService, private router: Router, private loader: LoaderService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required
          ]
        ],
        password: [
          '',
          [
            Validators.required
          ]
        ],
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
    const credentials = {
        email: this.form.get("username")?.value,
        password: this.form.get("password")?.value
    };
      this.authService.login(credentials).subscribe({
        next: res => {
          if(res.status == 1) {
            this.storageService.accessToken = res.data.accessToken;
            this.toastService.showSuccess(res.message)
            this.router.navigate(['/clinic-dashboard']);
          } else {
            this.toastService.showError(res.message)
          }
        },
        error: err => {
          console.log(err);
        }
      });
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }
}
