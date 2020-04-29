import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

export interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  openLogin(): void {
    console.log('Hello Modal');
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '300px',
      data: {
        username: this.username,
        password: this.password,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.username = result.username;
      console.log(result.username);
      this.password = result.password;
      console.log(result.password);
    });
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
}
