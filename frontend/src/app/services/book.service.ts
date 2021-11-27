import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookModel } from '../models/book-model';

const staticRole = "ROLE_TOKEN_LIBRARIAN"; // ROLE_TOKEN_MEMBER || ROLE_TOKEN_LIBRARIAN
const staticHeaders= new HttpHeaders().set('content-type', 'application/json').set('Authorization', staticRole);

import { environment as ENV } from 'src/environments/environment';
const RESOURCE_PATH = `${ENV.base_url}/books`;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {

  }

  getBooks(): Observable<BookModel[]> {
    return this.httpClient.get(RESOURCE_PATH, { headers: staticHeaders }).pipe(map((response: any)=>{
      return response?.data ? response.data : [];
    }));
  }


}
