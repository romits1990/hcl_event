import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { BookListComponent } from '../book-list/book-list.component';

export const TOP_LEVEL_ROUTES: Routes = [
    { path: '', component: BookListComponent },
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
