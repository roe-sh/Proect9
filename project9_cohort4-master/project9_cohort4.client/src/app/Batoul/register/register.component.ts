import { Component } from '@angular/core';
import { BUrlServicesService } from '../burl-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  ngOnInit() { }

  constructor(private _ser: BUrlServicesService, private _route: Router) { }


  newUser(data: any) {
    debugger

    if (data.password !== data.ConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    debugger
    const formData = new FormData();
    formData.append('FullName', data.fullName);
    formData.append('Email', data.email);
    formData.append('Password', data.password);

    console.log(formData)
    console.log(data)

    this._ser.register(formData).subscribe(() => {
      alert("success")
      this._route.navigate(['/login'])
    }, (error) => {
      alert("failed")
    });
  }





}
