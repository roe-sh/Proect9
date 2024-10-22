import { Component } from '@angular/core';
import { UrlService } from '../../Urlmustafa/url.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.css'
})
export class AddpostComponent {
  ngOnInit() {
    this.userId = localStorage.getItem("userId")

  }

  constructor(private _src: UrlService) {

  }
  userId: any 
  image: any
  changeImage(event: any) {

    this.image = event.target.files[0]

  }

  Addpost(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("postImage", this.image)
    this._src.Addnewpost(form, this.userId).subscribe(() => {
      alert("Tips added successfully")
    })
  }
}
