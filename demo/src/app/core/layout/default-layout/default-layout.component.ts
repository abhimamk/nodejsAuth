import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css'],
})
export class DefaultLayoutComponent implements OnInit {
  userDetails: User;
  constructor(private authService: AuthService, private router: Router) {
    this.userDetails = JSON.parse(localStorage.getItem('me'));
  }

  ngOnInit(): void {}

  logout(): any {
    this.authService.logout().subscribe(
      (res) => {
        localStorage.removeItem('Token');
        localStorage.removeItem('cookie');
        localStorage.removeItem('me');

        this.router.navigateByUrl('auth/login');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
