import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  show = false;
  error: string = null;
  constructor(
    private formBuilder: FormBuilder,
    private authLogin: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  onLogin(): any {
    if (this.loginForm.invalid) {
      return;
    }
    this.authLogin.login(this.loginForm.value).subscribe(
      (res) => {
        if (res) {
          localStorage.setItem('Token', res.csrfToken);
          localStorage.setItem('cookie', res.cookie);
          this.router.navigateByUrl('/title');
          this.authLogin.me().subscribe(
            (me) => {
            localStorage.setItem('me', JSON.stringify(me.user));

          });
          this.clearFormData();
        }
      },
      (customError) => {
        this.error = customError.error.errors[0].detail;
      }
    );
  }

  clearFormData(): void {
    this.loginForm.reset();
  }

  showPassword(): void {
    this.show = !this.show;
  }
}
