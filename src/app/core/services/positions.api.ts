import { Injectable } from '@angular/core'; import { HttpClient } from '@angular/common/http';
import { Position } from './models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' }) export class PositionsApi {
  constructor(private http: HttpClient) { }

  get(accountId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`${environment.apiUrl}/positions?accountId=${accountId}`);
  }
}
