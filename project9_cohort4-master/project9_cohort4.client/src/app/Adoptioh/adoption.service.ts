import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private baseUrl = 'https://localhost:7001/api/AdoptionApplications'; 

  constructor(private http: HttpClient) { }

  submitAdoptionRequest(adoptionDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, adoptionDetails);
  }

  sendAdoptionEmail(userEmail: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-email`, { userEmail });
  }
}
