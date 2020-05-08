import { Component, OnInit } from '@angular/core';
import { TrackService } from './../track.service';
import { CardInfo } from '../CardInfo';
import { Track } from '../models/Track';
import { UserService } from '../user.service';

@Component({
  selector: 'app-discover-page',
  templateUrl: './discover-page.component.html',
  styleUrls: ['./discover-page.component.css'],
})
export class DiscoverPageComponent implements OnInit {
  constructor(private trackService: TrackService,
    private userService: UserService) {}

  tracks: CardInfo[] = [];

  ngOnInit(): void {
    this.trackService.getTracks().subscribe(
      (response) => {
        this.tracks = response.map<CardInfo>(track => ({
          title: track.title,
          isTrack: true,
          author: track.author.username,
          description: track.description,
          stars: track.rating,
          viewCount: track.views,
          favorite: false,
          link: "tbd",
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
