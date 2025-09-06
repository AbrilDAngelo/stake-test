import { Injectable } from '@angular/core'; import { HttpClient } from '@angular/common/http'; 
import { Quote } from './models'; import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) export class QuotesApi {
  constructor(private http: HttpClient) { }
  list(): Observable<Quote[]> { 
    return this.http.get<Quote[]>(`${API_BASE}/quotes`); 
  }
}
