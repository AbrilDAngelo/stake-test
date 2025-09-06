import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from './models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class QuotesApi {
  constructor(private http: HttpClient) {}
  list(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${environment.apiUrl}/quotes`);
  }
}
