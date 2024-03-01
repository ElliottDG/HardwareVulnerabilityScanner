import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private readonly AUTHAPI: string =
    'https://hardwarevulnerabilityscannerservice.onrender.com/Auth';

  httpOptions = {
    headers: { 'Content-Type': 'application/json' },
  };

  signin(email: string, password: string): Observable<any> {
    return this.http.post(
      this.AUTHAPI + '/signin',
      {
        email,
        password,
      },
      this.httpOptions
    );
  }
  signup(email: string, password: string): Observable<any> {
    return this.http.post(
      this.AUTHAPI + '/signup',
      {
        email,
        password,
      },
      this.httpOptions
    );
  }

  signout(): Observable<any> {
    return this.http.post(this.AUTHAPI + '/signout', {}, this.httpOptions);
  }
}
