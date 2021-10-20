import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  @Input() userId?: number;

  @Input() editMode?: boolean = false;

  user: User;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.user = await this.apiService.getUser(this.userId);
  }

  editUser() {
    this.router.navigate([`users/edit/${this.user.id}`], { state: { user: this.user } });
  }

  async removeUser(): Promise<void> {
    
  }
}
