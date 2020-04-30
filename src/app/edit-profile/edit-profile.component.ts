import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  //input and output
  @Output() public picSwitcher = new EventEmitter();

  //constructor
  constructor() { }

  ngOnInit(): void {
  }
  //Update the rest of the profile

  //switches user image for the selected one
  //Beta for the update picture function
  savePicture(newUrl: string){
    this.picSwitcher.emit(newUrl)
  }
}
