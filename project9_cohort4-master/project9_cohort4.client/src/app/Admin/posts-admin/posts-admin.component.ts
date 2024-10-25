import { Component } from '@angular/core';
import { UrlService } from '../../Urlmustafa/url.service';

@Component({
  selector: 'app-posts-admin',
  templateUrl: './posts-admin.component.html',
  styleUrl: './posts-admin.component.css'
})
export class PostsAdminComponent {
  ngOnInit() {
    this.gettheTestimonial();
  }


  constructor(private _ser: UrlService) {

  }

  TestimonialArray: any
  gettheTestimonial() {
    this._ser.GetTestimonial().subscribe((data) => {
      this.TestimonialArray = data
      console.log(this.TestimonialArray, "this.TestimonialArray")
    })
  }

  deleteContactById(id: any) {
    this._ser.deleteTestimonial(id).subscribe(() => {
      alert("This  message deleted successfully");
      this.gettheTestimonial();
    });
  }
}
