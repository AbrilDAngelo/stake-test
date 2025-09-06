import { Injectable } from '@angular/core'; import { HttpClient } from '@angular/common/http'; 
import { API_BASE } from './api.config'; import { Position } from './models'; 
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) export class PositionsApi {
  constructor(private http: HttpClient) { }

  get(accountId: string): Observable<Position[]> { 
    return this.http.get<Position[]>(`${API_BASE}/positions?accountId=${accountId}`); 
  }
}
