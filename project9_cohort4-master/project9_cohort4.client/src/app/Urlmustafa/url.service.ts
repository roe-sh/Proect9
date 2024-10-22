import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) { }

  staticData = "https://localhost:7072/api";
  
  Addnewpost(data: any ,id:any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Posts/AddPosts${id}`, data)
  }



}
