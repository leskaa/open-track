import { Component, OnInit } from '@angular/core';
import { TrackService } from './../track.service';
import { CardInfo } from '../models/CardInfo';
import { Track } from '../models/Track';
import { UserService } from '../user.service';
import { User } from '../models/User';
import { DiscoverService } from '../discover.service';

@Component({
  selector: 'app-discover-page',
  templateUrl: './discover-page.component.html',
  styleUrls: ['./discover-page.component.css'],
})
export class DiscoverPageComponent implements OnInit {
  fullTracks: CardInfo[] = [];
  tracks: CardInfo[] = [];

  constructor(private discoverService: DiscoverService) {}

  ngOnInit(): void {
    this.setUpTracks();
    this.discoverService.search.subscribe((result) => this.search(result));
  }

  async setUpTracks(): Promise<void> {
    this.tracks = [];
    const vars = await this.discoverService.createDiscover();
    vars[3].forEach((track: CardInfo) => {
      this.fullTracks.push(track);
      this.tracks.push(track);
    });
  }

  search(result: string): void {
    this.tracks = [];
    this.fullTracks.forEach((track: CardInfo) => {
      if (
        track.title.toLowerCase().trim().includes(result.toLowerCase().trim())
      ) {
        this.tracks.push(track);
      }
    });
  }
}
