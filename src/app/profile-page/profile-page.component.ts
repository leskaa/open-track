import { Component, OnInit } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from './../models/User';
import { Profile } from '../models/Profile';
import { UserService } from '../user.service';
import { ProfileService } from '../profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CardInfo } from '../models/CardInfo';
import { DiscoverService } from '../discover.service';

export type Changer = 'Profile' | 'Edit';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  faMapMarkerAlt = faMapMarkerAlt;
  user: User;
  profile: Profile;

  //************* Make validator for gravatar link ***************
  profileForm = this.fb.group({
    gravatarLink: [''],
    website: [''],
    location: [''],
    work: [''],
    education: [''],
    skills: [''],
  });
  gravatarLink: string;
  website: string;
  location: string;
  work: string;
  education: string;
  skills: string;
  tracks: CardInfo[] = [];

  //variables
  editor: Changer = 'Profile';
  //changing view
  //display the profile view
  get showProfile() {
    return this.editor === 'Profile';
  }
  //display the edit view
  get showEdit() {
    return this.editor === 'Edit';
  }
  //switch between the views
  toggleView(type: Changer) {
    this.gravatarLink = this.profile.image_relative_path;
    this.website = this.profile.website;
    this.location = this.profile.location;
    this.work = this.profile.work;
    this.education = this.profile.education;
    this.skills = this.profile.skills;
    this.editor = type;
  }
  //Constructor
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private discoverService: DiscoverService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setUpTracks();
  }

  async setUpTracks(): Promise<void> {
    const vars = await this.discoverService.createDiscover();
    this.user = vars[0];
    vars[3].forEach((track: CardInfo) => {
      if (track.author === this.user.username) {
        this.tracks.push(track);
      }
    });
    this.getProfile();
  }

  async getProfile(): Promise<void> {
    try {
      const profile = await this.profileService
        .getProfileById(this.user.pk)
        .toPromise();
      this.profile = profile;
    } catch (err) {
      console.log(err);
    }
  }

  async onSubmit(): Promise<void> {
    const newProfile: Profile = {
      user_id: this.user.pk,
      image_relative_path: this.gravatarLink,
      website: this.website,
      location: this.location,
      work: this.work,
      education: this.education,
      skills: this.skills,
    };
    try {
      const profile = await this.profileService
        .updateProfile(newProfile)
        .toPromise();
      this.profile = profile;
    } catch (err) {
      console.log(err);
    }
    this.toggleView('Profile');
  }
}
