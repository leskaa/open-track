import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  faTh,
  faUser,
  faHeart,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';
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

  loggedIn: boolean = false;
  title: string = '';
  url: string = '';
  profile: Profile;
  user: User;
  track: Track;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private profileService: ProfileService,
    private userService: UserService,
    private trackService: TrackService,
    private router: Router
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
    const pages: string[] = ['discover', 'profile', 'favorites', 'about'];
    pages.forEach((page) => {
      if (this.url.includes(page)) {
        this.document.getElementById(page).setAttribute('class', 'active');
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
    } else if (this.url.includes('track')) {
      const idInUrl = +this.url.substring(this.url.length - 1, this.url.length);
      this.getTrack(idInUrl);
    }
  }

  async getTrack(id: number): Promise<void> {
    try {
      const currTrack = await this.trackService.getTrackById(id).toPromise();
      this.track = currTrack;
      this.title = this.track.title;
    } catch (err) {
      console.log(err);
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
