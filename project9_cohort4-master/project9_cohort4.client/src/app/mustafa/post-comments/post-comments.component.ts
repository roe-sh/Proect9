import { Component } from '@angular/core';
import { UrlService } from '../../Urlmustafa/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css'
})
export class PostCommentsComponent {

  

  toggleForm(item: any) {
    item.showForm = !item.showForm;
  }

  replaysForm(item: any) {
    item.showreply = !item.showreply;
  }


  userId: any;
  parameter: any;
  postdetails: any
  comments: any
  replays: any

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getPostById(this.parameter);
    this.getcommentsByPostId(this.parameter);
  }
  
  constructor(private _ser: UrlService, private _route: ActivatedRoute) { }
 
  getPostById(postId: any) {
    this._ser.GetPostDetails(postId).subscribe((data) => {
      this.postdetails = data;
    });
  }
  getcommentsByPostId(postId: any) {
    this._ser.GetCommentByPostId(postId).subscribe((data) => {
      this.comments = data;
    });
  }

  Addcomment(formData: any) {
    debugger;
    if (this.userId != undefined || this.userId != null) {
      const form = new FormData();

      for (let key in formData) {
        form.append(key, formData[key]);
      }
      form.append("userId", this.userId);

      this._ser.AddnewComment(this.parameter, form).subscribe(
        () => {
          alert("comment added successfully");
          console.log("Response:", form);
          this.getcommentsByPostId(this.parameter);

        },
        (error) => {
          alert("Failed to add comment");
          console.error("Error:", error);
        }
      );
    } else {
      alert("you have to logged in to add comment")
    }
  }

  getreplaybycommentid(id: any) {
    this._ser.GetAllreplaybycommentid(id).subscribe((data) => {
      this.replays = data;
    });
  }

  addreplay(formdata: any, commentId : any) {

    const form = new FormData();
    for (let key in formdata) {
      form.append(key, formdata[key]);
    }
    form.append("userId", this.userId);
    form.append("commentId", commentId);

    this._ser.AddreplayoneComment(form).subscribe(
      () => {
        alert("replay added successfully");
        console.log("Response:", form);
        this.getcommentsByPostId(this.parameter);
      },
      (error) => {
        alert("Failed to add replay");
        console.error("Error:", error);
      }
    );
  }
  
}

