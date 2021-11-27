import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model';
const BASE_URL = environment.base_url;
const USER_RESOURCE_URL = `${BASE_URL}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  authenticateUser(data: LoginModel): Observable<any>{
    let apiEndPoint: string = `${USER_RESOURCE_URL}/login`;
    return this.httpClient.post(apiEndPoint, data);
  }
}
