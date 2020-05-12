import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  faTh,
  faUser,
  faHeart,
  faEye,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Profile } from './../../models/Profile';
import { User } from './../../models/User';
import { ProfileService } from './../../profile.service';
import { UserService } from './../../user.service';
import { TrackService } from '../../track.service';
import { Track } from 'src/app/models/Track';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faTh = faTh;
  faUser = faUser;
  faHeart = faHeart;
  faEye = faEye;
  faPlusSquare = faPlusSquare;

  loggedIn: boolean = false;
  title: string = '';
  url: string = '';
  profile: Profile;
  user: User;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private profileService: ProfileService,
    private userService: UserService,
    private trackService: TrackService
  ) {}

  ngOnInit(): void {
    this.url = this.document.location.href;
    this.getTitle();
    this.changeBox();
    this.checkLogin(this.userService.isLoggedIn());
  }

  checkLogin(userLoggedIn: boolean): void {
    if (userLoggedIn) {
      this.loggedIn = true;
      this.getProfile();
    } else {
      this.loggedIn = false;
    }
  }

  changeBox(): void {
    this.url = this.document.location.href;
    const pages: string[] = this.loggedIn
      ? ['discover', 'profile', 'favorites', 'about', 'create']
      : ['discover', 'about'];
    pages.forEach((page) => {
      if (this.url.includes(page)) {
        this.document.getElementById(page).setAttribute('class', 'active box');
      } else {
        this.document.getElementById(page).setAttribute('class', 'box');
      }
    });
    this.getTitle();
  }

  getTitle(): void {
    if (this.url.includes('discover')) {
      this.title = 'Discover OpenTrack';
    } else if (this.url.includes('profile')) {
      this.title = 'Profile';
    } else if (this.url.includes('favorites')) {
      this.title = 'Your Favorites';
    } else if (this.url.includes('about')) {
      this.title = 'About OpenTrack';
    } else if (this.url.includes('create')) {
      this.title = 'Create Track';
    } else if (this.url.includes('track')) {
      this.title = 'Explore Track';
    }
  }

  async getProfile(): Promise<void> {
    try {
      const user = await this.userService.getUser().toPromise();
      const profile = await this.profileService
        .getProfileById(user.pk)
        .toPromise();
      this.profile = profile;
      this.user = user;
    } catch (err) {
      console.log(err);
    }
  }
}
