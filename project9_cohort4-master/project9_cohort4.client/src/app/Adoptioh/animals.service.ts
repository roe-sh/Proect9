import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiUrl = 'https://localhost:5001/api/Animals1';  // Update with your API base URL

  constructor(private http: HttpClient) { }

  // Method to fetch animals with optional filters
  getAnimals(filters?: { shelterId?: number; breed?: string; age?: number; species?: string }): Observable<any[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.shelterId !== undefined && filters.shelterId !== null) {
        params = params.append('shelterId', filters.shelterId.toString());
      }
      if (filters.breed) {
        params = params.append('breed', filters.breed);
      }
      if (filters.age !== undefined && filters.age > 0) {
        params = params.append('age', filters.age.toString());
      }
      if (filters.species) {
        params = params.append('species', filters.species);
      }
    }

    return this.http.get<any[]>(`${this.apiUrl}`, { params });
  }

  // Method to fetch a specific animal by its ID
  getAnimalById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
