import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  show = false;
  error: string = null;
  constructor(
    private formBuilder: FormBuilder,
    private authLogin: AuthService,
    private router: Router,
    public toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.regForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  toasterSuccess(responseGood): any {
    this.toaster.success('', responseGood, {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }

  toasterError(responseError): any {
    this.toaster.error('', responseError, {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }

  regSubmit(): any {
    if (this.regForm.invalid) {
      return;
    }
    this.authLogin.newRegistration(this.regForm.value).subscribe(
      (res) => {
        if (res) {
          this.router.navigateByUrl('/auth/login');
          this.clearFormData();
        }
      },
      (error) => {
        this.error = error.error.errors[0].errorMessage;
      }
    );
  }

  clearFormData(): void {
    this.regForm.reset();
  }

  showPassword(): void {
    this.show = !this.show;
  }
}
