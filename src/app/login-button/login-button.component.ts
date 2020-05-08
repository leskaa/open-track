import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginModalComponent } from '../login-modal/login-modal.component';
import { UserService } from '../user.service';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

export interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent implements OnInit {
  @Output() userLoggedIn = new EventEmitter<boolean>();

  username: string;
  password: string;
  loggedIn: boolean = false;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.username = '';
    this.password = '';
    this.loggedIn = this.userService.isLoggedIn()
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
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
        this.onLogin();
      }
    });
  }

  onLogin(): void {
    this.userService.loginUser(this.username, this.password).subscribe(
      (response) => {
        this.loggedIn = true;
        this.snackBar.open(`Logged in as ${this.username}`, 'Dismiss', {
          duration: 2000,
        });
        this.userLoggedIn.emit(true);
      },
      (error) => {
        this.snackBar.open(`Incorrect Username / Password`, 'Dismiss', {
          duration: 2000,
        });
        this.userLoggedIn.emit(false);
      }
    );
  }

  logout(): void {
    this.userService.logoutUser();
    this.loggedIn = false;
    this.snackBar.open(`Logged Out`, 'Dismiss', {
      duration: 2000,
    });
    this.userLoggedIn.emit(false);
  }
}
