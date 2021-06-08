import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): any {
    this.authService.logout().subscribe(
      (res) => {
        localStorage.removeItem('Token');
        localStorage.removeItem('cookie');
        this.router.navigateByUrl('auth/login');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
