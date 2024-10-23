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



  shareOnX(post: any) {
    const postUrl = `https://www.islambook.com/azkar/16/%D8%AF%D8%B9%D8%A7%D8%A1-%D8%AE%D8%AA%D9%85-%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86-%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85#google_vignette`; // استبدل هذا بالرابط الفعلي للبوست
    const tweetText = encodeURIComponent(post.storyContent);
    const xShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(postUrl)}`;

      window.open(xShareUrl, '_blank');
  }
}
