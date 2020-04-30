import { Component, OnInit } from '@angular/core';
export type Changer = 'Profile' | 'Edit'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //variables
  editor: Changer = 'Profile';
  //temp variables until service is added
  //temp name
  name: string = 'John Doe'
  //temp location
  location: string = 'Chicago'
  //temp website
  website: string = 'johndoe.com'
  //temp job
  work: string = 'Software Engineer'
  //temp education
  education: string = 'Bachelor of Computer Science from NDSU'
  //temp skills list
  skills: Array<string> = ['Java', 'C++', 'React', 'Postgres', 'Photoshop', 'Microsoft Office']
  //temp picture location
  profilePic: string = 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

  //changing view
  //display the profile view
  get showProfile(){
    return this.editor === 'Profile'
  }
  //display the edit view
  get showEdit(){
    return this.editor === 'Edit'
  }
  //switch between the views
  toggleView(type: Changer){
    this.editor = type;
  }
  //Constructor
  constructor() { }

  ngOnInit(): void {
  }

}
