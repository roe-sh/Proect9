import { Component } from '@angular/core';
import { UrlService } from '../../Urlmustafa/url.service';

@Component({
  selector: 'app-not-acceptposts',
  templateUrl: './not-acceptposts.component.html',
  styleUrl: './not-acceptposts.component.css'
})
export class NotAcceptpostsComponent {

  ngOnInit() {
    this.GetAllTestimonial();
  }


  constructor(private _ser: UrlService) {

  }

  TestimonialArray: any
  GetAllTestimonial() {
    this._ser.GetAllTestimonialToAccept().subscribe((data) => {
      this.TestimonialArray = data
      console.log(this.TestimonialArray, "this.TestimonialArray")
    })
  }

  deleteContactById(id: any) {
    this._ser.deleteTestimonial(id).subscribe(() => {
      alert("This  message deleted successfully");
      this.GetAllTestimonial();
    });
  }

  AcceptTheTestimonial(id: any) {
    this._ser.UpdateTestimonial(id).subscribe(() => {

      alert("This  message accepted successfully");
      this.GetAllTestimonial();
    })
  }



}
