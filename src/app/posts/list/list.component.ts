import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.posts = await this.apiService.getPosts();
  }

  trackByPosts(index, item): number {
    return item.id;
  }

  showPostDetail(item: Post) {
    this.router.navigate([`posts/${item.id}`], { state: { post: item } });
  }
}
