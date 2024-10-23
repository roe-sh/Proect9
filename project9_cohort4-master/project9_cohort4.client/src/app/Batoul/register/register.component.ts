import { Component } from '@angular/core';
import { BUrlServicesService } from '../burl-services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
      //alert('Passwords do not match');

      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please retype your password",
      });

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
      //alert("success")

      Swal.fire({
        icon: "success",
        title: "Welcome in our family",
        text: "your registration was successful",
        showClass: {
          popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
        },
        hideClass: {
          popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
        }
      });

      this._route.navigate(['/login'])

    }, (error) => {
      //alert("failed")

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again",
      });

    });
  }





}
