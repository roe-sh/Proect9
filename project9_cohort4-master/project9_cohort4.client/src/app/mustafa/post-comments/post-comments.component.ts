import { Component } from '@angular/core';
import { UrlService } from '../../Urlmustafa/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css'
})
export class PostCommentsComponent {


  parameter: any;
  postdetails: any
  comments: any

  ngOnInit() {
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
    }); }
}
