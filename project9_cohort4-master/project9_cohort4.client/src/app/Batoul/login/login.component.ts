import { Component } from '@angular/core';
import { BUrlServicesService } from '../burl-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  ngOnInit() { }


  constructor(private _ser: BUrlServicesService, private _route: Router) { }

  login(data: any) {
    //debugger
    const form = new FormData

    for (let key in data) {
      form.append(key, data[key])
    }


    this._ser.login(form).subscribe((outputData) => {

      //debugger
      this._ser['userId'].next(outputData.user.userId);
      localStorage.setItem("userId", outputData.user.userId)


      //debugger
      this._ser.checkAdmin(this._ser.userId.value).subscribe((checkData) => {

        this._ser["isAdmin"].next(checkData)
        localStorage.setItem("isAdmin", checkData)

      })




      this._route.navigate(['/'])

    })

  }







}
