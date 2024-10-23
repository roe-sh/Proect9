import { Component } from '@angular/core';
import { BUrlServicesService } from '../../Batoul/burl-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  userId: any

  ngOnInit() {

    this._ser.userIdObs.subscribe((userId) => {
      this.userId = userId
    })
    console.log(this.userId)

  }

  constructor(private _ser: BUrlServicesService, private _route: Router) { }

  logout() {
    this._ser.logout();

    this._route.navigate(["/"])

  }


}
