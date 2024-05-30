import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private BASE_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  register(customer:any): Observable<any> {
    return this.http.post(this.BASE_URL + 'signup', customer)
  }

  // login(loginRequest:any): Observable<any> {
  //   return this.http.post(this.BASE_URL + 'login', loginRequest)
  // }

  login(loginRequest: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.BASE_URL + 'login', loginRequest, { headers, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  private createAuthenticationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    console.log("jwtToken0-------", jwtToken);
    if (jwtToken) {
        return new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
    } else {
        console.log("JWT Token not found in local storage");
        return new HttpHeaders();
    }
  }

  hello(): Observable<any> {
    const headers = this.createAuthenticationHeader();
    return this.http.get(this.BASE_URL + 'api/hello', { headers, responseType: 'text' });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
}
