import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CommentsModule } from '../comments/comments.module';
import { FormsModule } from '@angular/forms';
import { UsersModule } from '../users/users.module';

const routes: Routes = [
  {
    path: ':postId',
    component: DetailComponent
  },
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,

    //Comments
    CommentsModule,

    //Users
    UsersModule
  ]
})
export class PostsModule { }
