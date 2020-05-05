import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../user.service'

export interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent implements OnInit {

  username: string;
  password: string;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private userService: UserService) {}

  ngOnInit() {
    this.username = '';
    this.password = '';
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      width: '250px',
      data: {
        username: this.username,
        password: this.password,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.username = result.username;
        this.password = result.password;
        this.onRegister();
      }
    });
  }

  onRegister(): void {
    this.userService.registerUser(this.username, this.password).subscribe(
      response => {
        this.snackBar.open(`User, ${this.username}, registered`, 'Dismiss', {
          duration: 2000
        });
      },
      error => {
        this.snackBar.open(`Registration Failed`, 'Dismiss', {
          duration: 2000
        });
      }
    )
  }
}
