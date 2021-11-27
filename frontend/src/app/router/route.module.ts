import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "../main/main.component";
import { LoginComponent } from '../authentication/components/login/login.component';
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";

export const TOP_LEVEL_ROUTES: Routes = [
    { path: '', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'lazy-lorem', loadChildren: () => import('../lazy-lorem/lazy-lorem.module').then(m => m.LazyLoremModule) },
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(TOP_LEVEL_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class RouteModule { }
