import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomTitleComponent } from './custom-title.component';

const routes: Routes = [
    { path: '', component: CustomTitleComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomTitleRoutingModule {
    static components = [
        CustomTitleComponent
    ];
}
