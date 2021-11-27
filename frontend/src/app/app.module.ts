import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouteModule } from './router/route.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookListComponent } from './book-list/book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    BookListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
