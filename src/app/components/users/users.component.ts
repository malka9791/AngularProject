import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{ 
  constructor(private usersService:UsersService){}
  list:User[]=[];
  
  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.list = users;  
    });
  } 

}
