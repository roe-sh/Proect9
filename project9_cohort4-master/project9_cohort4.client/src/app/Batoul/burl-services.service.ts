import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BUrlServicesService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkLoggedIn());

  userId: BehaviorSubject<any> = new BehaviorSubject<any>('');
  isAdmin: BehaviorSubject<any> = new BehaviorSubject<any>('false');

  isLoggedInObs = this.isLoggedInSubject.asObservable();
  userIdObs = this.userId.asObservable();
  isAdminObs = this.isAdmin.asObservable();

  private BaseUrl = 'https://localhost:7001/api/';

  constructor(private http: HttpClient) { }

  // Check if the user is logged in
  private checkLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Public method to check login status
  public isLoggedIn(): boolean {
    return this.isLoggedInSubject.value; // Get the current login status
  }

  // Register a new user
  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}LoginAndRegister/register`, data);
  }

  // Log in a user
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}LoginAndRegister/login`, data).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          this.isLoggedInSubject.next(true);
          this.userId.next(response.userId);
        }
      })
    );
  }

  // Check if a user is an admin
  checkAdmin(userId: any): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}LoginAndRegister/isAdmin/${userId}`);
  }

  // Log out the user
  logout(): void {
    this.userId.next('');
    this.isAdmin.next('false');
    this.isLoggedInSubject.next(false);
    localStorage.clear();
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Profile/getAllUsers`);
  }

  // Get user information by ID
  getUserInfo(userId: number): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Profile/getUserById/${userId}`);
  }

  // Edit user information by ID
  editUserInfo(userId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.BaseUrl}Profile/editProfileInfo/${userId}`, data);
  }

  // Edit user password by ID
  editPassword(userId: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}Profile/editPassword/${userId}`, data);
  }



  //////////////////////////////////////// contacts
  sendMessage(data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}Contacts / sendContactMessage`, data)
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
