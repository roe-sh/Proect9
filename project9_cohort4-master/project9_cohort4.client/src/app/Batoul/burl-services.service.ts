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


  //////////////////////////// login , register , check admin , logout
  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}LoginAndRegister/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}LoginAndRegister/login`, data);
  }

  checkAdmin(userId: any): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}LoginAndRegister/isAdmin/${userId}`)
  }

  logout() {

    this.userId.next("");
    this.isAdmin.next("false");

    localStorage.clear();
  }



  ////////////////////////// profile and users
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Profile/getAllUsers`)
  }

  getUserInfo(userId: number): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Profile/getUserById/${userId}`)
  }

  editUserInfo(userId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.BaseUrl}Profile/editProfileInfo/${userId}`, data)
  }

  editPassword(userId: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}Profile/editPassword/${userId}`, data)
  }



  //////////////////////////////////////// contacts
  sendMessage(data: any): Observable<any> {
    return this.http.post<any>(`${ this.BaseUrl }Contacts / sendContactMessage`, data)
  }

  replyToMessage(adminId: any, contactId: any, data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}Contacts/replyToContacts/${adminId}/${contactId}`, data)
  }

  getAllMessages(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Contacts/getAllContactMessages`)
  }

  getMessageDetails(contactId: any): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Contacts/getContactMessageById/${contactId}`)
  }




  //////////////////////////////////// admin users
  assignAdmin(userId: any): Observable<any> {
    return this.http.put<any>(`${this.BaseUrl}AdminUsers/assignUserAsAdmin/${userId}`, {})
  }












}
