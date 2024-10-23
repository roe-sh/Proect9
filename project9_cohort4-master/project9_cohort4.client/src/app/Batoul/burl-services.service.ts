import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BUrlServicesService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkLoggedIn());

  constructor(private http: HttpClient) { }

  
  isLoggedInObs = this.isLoggedInSubject.asObservable();

  userId: BehaviorSubject<any> = new BehaviorSubject<any>('');
  userIdObs = this.userId.asObservable();

  isAdmin: BehaviorSubject<any> = new BehaviorSubject<any>("false");
  isAdminObs = this.isAdmin.asObservable();

  
  private checkLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  BaseUrl = "https://localhost:7001/api/";

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}LoginAndRegister/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}LoginAndRegister/login`, data);
  }

  checkAdmin(userId: number): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}LoginAndRegister/isAdmin/${userId}`);
  }

  setLoggedIn(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }
}
