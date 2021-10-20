import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.user = history.state.user as User;
    
    if(!this.user.id){
      const usersCount = history.state.usersCount + 1;
      this.user = new User(usersCount);
    }

    this.userForm = this._formBuilder.group({
        id: [this.user.id], 
        name: [this.user.name, [Validators.required]],
        username: [this.user.username, [Validators.required]],
        email: [this.user.name, [Validators.required]],
        phone: [this.user.phone, [Validators.required]],
        website: [this.user.website, [Validators.required]],
        address: this._formBuilder.group({
          street: [this.user.address.street, [Validators.required]],
          suite: [this.user.address.suite, [Validators.required]],
          city: [this.user.address.city, [Validators.required]],
          zipcode: [this.user.address.zipcode, [Validators.required]],
          geo: this._formBuilder.group({
            lat: [this.user.address.geo.lat, [Validators.required]],
            lng: [this.user.address.geo.lng, [Validators.required]]
          })
        }),
        company: this._formBuilder.group({
          name: [this.user.company.name, [Validators.required]],
          catchPhrase: [this.user.company.catchPhrase, [Validators.required]],
          bs: [this.user.company.bs, [Validators.required]]
        })
    });
  }

  async saveUser() {
    const user = this.userForm.getRawValue() as User;
    await this.apiService.updateUser(user);

    this.goBack();
  }

  goBack() {
    this.router.navigate(['/users/list']);
  }
}
