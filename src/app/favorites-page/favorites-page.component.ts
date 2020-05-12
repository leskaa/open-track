import { Component, OnInit } from '@angular/core';
import { CardInfo } from '../models/CardInfo';
import { DiscoverService } from '../discover.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css'],
})
export class FavoritesPageComponent implements OnInit {
  tracks: CardInfo[] = [];

  constructor(private discoverService: DiscoverService) {}

  ngOnInit(): void {
    this.setUpTracks();
  }

  async setUpTracks(): Promise<void> {
    const vars = await this.discoverService.createDiscover();
    vars[3].forEach((track: CardInfo) => {
      if (this.discoverService.isFavorite(vars[1], track.track_id)) {
        this.tracks.push(track);
      }
    });
  }
}
