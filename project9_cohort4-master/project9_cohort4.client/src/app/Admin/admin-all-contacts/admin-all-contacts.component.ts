import { Component } from '@angular/core';
import { BUrlServicesService } from '../../Batoul/burl-services.service';

@Component({
  selector: 'app-admin-all-contacts',
  templateUrl: './admin-all-contacts.component.html',
  styleUrl: './admin-all-contacts.component.css'
})
export class AdminAllContactsComponent {

  ngOnInit() {

    this.getAllMessages()

  }


  constructor(private _ser: BUrlServicesService) { }


  contactsArray: any

  getAllMessages() {
    this._ser.getAllMessages().subscribe((data) => {
      this.contactsArray = data
    })
  }










}
