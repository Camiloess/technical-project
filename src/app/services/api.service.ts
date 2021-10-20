import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://jsonplaceholder.typicode.com/';
  private users: User[] = [];
  private posts: Post[] = [];
  private comments: Comment[] = [];
  
  constructor(
    private _http: HttpClient
  ) {
    this.initializeData();
  }

  //Get all data to handle state 
  async initializeData(): Promise<void> {
    this.users = await this.getUsers();
    this.posts = await this.getPosts();
    this.comments = await this.getComments();
  }

  /** POSTS */
  getPost(postId: number) : Promise<Post> {
    if(this.posts.length > 0) {
      return new Promise((resolve) => {
        const post = this.posts.find(item => item.id === postId);
        resolve(post);
      });
    } else {
      return this._http.get<Post>(`${this.baseUrl}posts/${postId}`).toPromise();
    }    
  }

  getPosts() : Promise<Post[]> {
    if(this.posts.length > 0) {
      return new Promise((resolve) => {
        resolve(this.posts);
      });
    } else {
      return this._http.get<Post[]>(`${this.baseUrl}posts`).toPromise();
    }
  }

  updatePost(post: Post) : Promise<Post> {
    if(this.posts.length > 0) {
      return new Promise((resolve) => {
        const index = this.posts.findIndex((obj => obj.id == post.id));
        this.posts[index] = post;
        resolve(post);
      });
    } else {
      return this._http.put<Post>(`${this.baseUrl}posts/${post.id}`, post).toPromise();
    }
  }

  /** USERS */

  getUsers() : Promise<User[]> {
    if(this.users.length > 0) {
      return new Promise((resolve) => {
        resolve(this.users);
      });
    } else {
      return this._http.get<User[]>(`${this.baseUrl}users`).toPromise();
    }
  }

  getUser(userId: number) : Promise<User> {
    if(this.users.length > 0) {
      return new Promise((resolve) => {
        const user = this.users.find(item => item.id === userId);
        resolve(user);
      });
    } else {
      return this._http.get<User>(`${this.baseUrl}users/${userId}`).toPromise();
    }
  }

  updateUser(user: User) : Promise<User> {
    if(this.users.length > 0) {
      return new Promise((resolve) => {
        const index = this.users.findIndex((obj => obj.id == user.id));
        if(index < 0) {
          this.users.push(user);
        } else {
          this.users[index] = user;
        }        
        resolve(user);
      });
    } else {
      return this._http.put<User>(`${this.baseUrl}users/${user.id}`, user).toPromise();
    }
  }

  /** COMMENTS */
  getComments(postId: number = 0) : Promise<Comment[]> {
    if(this.comments.length > 0) {
      return new Promise((resolve) => {
        if(postId) {
          const results = this.comments.filter(item => item.postId === postId);
          resolve(results);
        } else{
          resolve(this.comments);
        }        
      });
    } else {
      let query = postId ? `?postId=${postId}` : '';
      return this._http.get<Comment[]>(`${this.baseUrl}comments${query}`).toPromise();
    }    
  }

  deleteComment(commentId: number) : Promise<Comment> {
    if(this.comments.length > 0) {
      return new Promise((resolve) => {
        this.comments = this.comments.filter(item => item.id !== commentId);
        resolve({} as Comment);
      });
    } else {
      return this._http.delete<Comment>(`${this.baseUrl}comments/${commentId}`).toPromise();
    }    
  }
}
