import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './core/layout/base-layout/base-layout.component';
import { DefaultLayoutComponent } from './core/layout/default-layout/default-layout.component';
import { RoleGuard } from './core/routeGuard/role.guard';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login'
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
      },
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'title', canActivate: [RoleGuard],
        loadChildren: () => import('src/app/components/custom-title/customTitle.module').then(mod => mod.CustomTitleModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
