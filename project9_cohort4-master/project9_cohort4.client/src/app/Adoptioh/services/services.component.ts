import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Service {
  serviceId: number;
  name: string;
  description: string;
  image: string; 
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchServices();
  }


  fetchServices(): void {
    this.getServices().subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.error('Error fetching services:', error); 
      }
    );
  }


  private getServices(): Observable<Service[]> {
    return this.http.get<Service[]>('https://localhost:7001/api/services');
  }
}
