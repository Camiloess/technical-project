import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataComponent } from './user-data/user-data.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'edit/:userId',
    component: UserFormComponent
  },
  {
    path: 'list',
    component: ListComponent
  }
];

@NgModule({
  declarations: [UserDataComponent, UserFormComponent, ListComponent],
  exports: [UserDataComponent, UserFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
