import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.users = await this.apiService.getUsers();
    console.log('this.users', this.users);
  }

  trackByUsers(index, item): number {
    return item.id;
  }

  showUserDetail(item: User) {
    this.router.navigate([`users/edit/${item.id}`], { state: { user: item } });
  }

  addUser() {
    this.router.navigate([`users/edit/new`], { state: { user: {}, usersCount: this.users.length } });
  }
}
