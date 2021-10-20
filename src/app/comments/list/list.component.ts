import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Comment } from 'src/app/models/Comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() postId?: number = 0;

  @Input() editMode?: boolean = false;

  //To put a limit of comments to show
  @Input() countLimit?: number = 0;

  comments: Comment[] = [];
  loading = false;

  constructor(
    private apiService: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const result = await this.apiService.getComments(this.postId);

    //order by latest comments using just the id because there was no date
    this.comments = result.sort((a, b) => b.id - a.id);

    if(this.countLimit > 0) {
      this.comments = this.comments.slice(0, this.countLimit);
    }

    this.loading = false;
  }

  async deleteComment(comment: Comment) {
    await this.apiService.deleteComment(comment.id);

    this.comments = this.comments.filter(item => item.id != comment.id);
  }

  trackByComments(index, item): number {
    return item.id;
  }
}
