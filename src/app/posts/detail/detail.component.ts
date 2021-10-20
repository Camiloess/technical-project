import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Post } from 'src/app/models/Post';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  editBtnLabel = 'Edit post';
  postId: number;
  editMode = false;
  post: Post = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.postId = parseInt(params['postId']);

      this.getPostData(history.state.post as Post);
    });
  }

  async getPostData(post: Post): Promise<void> {
    if(post) {
      this.post = post;
    } else {
      this.post = await this.apiService.getPost(this.postId);
    }
  }

  changeEditMode(): void {
    this.editMode = !this.editMode;
    this.editBtnLabel = this.editMode ? 'Cancel' : 'Edit post';
  }

  async savePost(): Promise<void> {
    await this.apiService.updatePost(this.post);

    this.changeEditMode();
  }
}
