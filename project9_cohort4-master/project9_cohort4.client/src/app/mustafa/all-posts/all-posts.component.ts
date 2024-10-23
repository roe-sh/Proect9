import { Component } from '@angular/core';
import { UrlService } from '../../Urlmustafa/url.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css'
})
export class AllPostsComponent {
  ngOnInit() {
    this.getAllPosts();
  }
  constructor(private _ser: UrlService) { }

  dataArray: any;
  getAllPosts() {
    this._ser.GetAllPosts().subscribe((data) => {
      this.dataArray = data;
    });
  }

  toggleLike(post: any) {
    // منطق لتغيير حالة اللايك
    post.userHasLiked = !post.userHasLiked;

    if (post.userHasLiked) {
      console.log('User liked the post');
      // إضافة منطق لحفظ حالة اللايك في الـ Backend إذا لزم الأمر
    } else {
      console.log('User unliked the post');
      // منطق لحفظ إزالة اللايك في الـ Backend
    }
  }
}
