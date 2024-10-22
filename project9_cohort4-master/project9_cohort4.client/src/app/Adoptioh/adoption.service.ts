import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  private apiUrl = 'https://localhost:7001/api/AdoptionApplications'; 

  constructor(private http: HttpClient) { }

  submitAdoptionRequest(adoptionDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, adoptionDetails);
  }
}
