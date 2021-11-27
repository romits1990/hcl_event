import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LazyLoremComponent } from './lazy-lorem.component';


const routes: Routes = [
  { path: '', component: LazyLoremComponent }
];

@NgModule({
  declarations: [
    LazyLoremComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LazyLoremModule { }
