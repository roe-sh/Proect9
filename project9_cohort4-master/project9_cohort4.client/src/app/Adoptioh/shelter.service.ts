import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {

  private apiUrl = 'https://localhost:5001/api/Shelters';  
  constructor(private http: HttpClient) { }

  // Fetch all shelters
  getShelters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Fetch a specific shelter by ID
  getShelterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
