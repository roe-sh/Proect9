import { Component } from '@angular/core';
import { BUrlServicesService } from '../../Batoul/burl-services.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {

  ngOnInit() {

    this.getAll()

  }

  constructor(private _ser: BUrlServicesService) { }


  usersarray: any

  getAll() {
    this._ser.getAllUsers().subscribe((data) => {
      this.usersarray = data
    })
  }








}
