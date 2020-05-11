import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../user.service';
import { ProfileService } from '../profile.service';

import { Profile } from './../models/Profile';

export interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css'],
})
export class RegisterButtonComponent implements OnInit {
  username: string;
  email: string;
  password: string;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.username = '';
    this.email = '';
    this.password = '';
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      width: '250px',
      data: {
        username: this.username,
        email: this.email,
        password: this.password,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.username = result.username;
        this.email = result.email;
        this.password = result.password;
        this.onRegister();
      }
    });
  }

  onRegister(): void {
    this.userService
      .registerUser(this.username, this.email, this.password)
      .subscribe(
        (response) => {
          this.userService.loginUser(this.username, this.password).subscribe(
            (response) => {
              this.userService.getUser().subscribe(
                (response) => {
                  const profile: Profile = {
                    user_id: response.pk,
                    image_relative_path: 'null',
                    website: '',
                    location: '',
                    work: '',
                    education: '',
                    skills: '',
                  };
                  this.profileService.createProfile(profile).subscribe(
                    (response) => {
                      this.snackBar.open(
                        `User, ${this.username}, registered`,
                        'Dismiss',
                        {
                          duration: 2000,
                        }
                      );
                    },
                    (error) => {
                      this.snackBar.open(`Profile Creation Failed`, 'Dismiss', {
                        duration: 2000,
                      });
                      console.log(error);
                    }
                  );
                },
                (error) => {
                  console.log(error);
                }
              );
            },
            (error) => {
              this.snackBar.open(`Post-Registration Login Failed`, 'Dismiss', {
                duration: 2000,
              });
              console.log(error);
            }
          );
        },
        (error) => {
          this.snackBar.open(`Registration Failed`, 'Dismiss', {
            duration: 2000,
          });
          console.log(error);
        }
      );
  }
}
