import { Component, OnInit, Input } from '@angular/core';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Track } from '../models/Track';
import { TrackService } from '../track.service';
import { MaterialService } from '../material.service';
import { Material } from '../models/Material';
import { CardInfo } from '../models/CardInfo';
import { DiscoverService } from '../discover.service';
import { User } from '../models/User';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css'],
})
export class TrackPageComponent implements OnInit {
  faHeart = faHeart;
  faStar = faStar;

  track: CardInfo;
  materials: CardInfo[] = [];
  ratings: any[] = [];
  fullFavorites: any[] = [];
  favorites: number[] = [];
  user: User;

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private discoverService: DiscoverService
  ) {}

  ngOnInit(): void {
    this.setUpTrack();
  }

  async setUpTrack(): Promise<void> {
    const vars = await this.discoverService.createDiscover();
    this.user = vars[0];
    this.favorites = vars[1];
    this.ratings = vars[2];
    this.fullFavorites = vars[4];
    this.getMaterials();
  }

  async getMaterials(): Promise<void> {
    try {
      const id = +this.route.snapshot.paramMap.get('id');
      const currTrack = await this.trackService.getTrackById(id).toPromise();
      this.track = {
        track_id: id,
        title: currTrack.title,
        isTrack: true,
        author: currTrack.author.username,
        description: currTrack.description,
        stars: currTrack.rating,
        isRated: this.discoverService.isRated(this.ratings, id),
        viewCount: currTrack.views,
        favorite: this.discoverService.isFavorite(this.favorites, id),
        link: currTrack.materials.length + ' Materials',
      };
      currTrack.materials.forEach((material) => {
        const card: CardInfo = {
          track_id: id,
          title: material.title,
          isTrack: false,
          author: currTrack.author.username,
          description: material.description,
          stars: material.rating,
          isRated: false,
          viewCount: material.views,
          favorite: false,
          link: material.website,
        };
        this.materials.push(card);
      });
    } catch (err) {
      console.log(err);
    }
  }

  changeStars(stars: number): void {
    this.track.stars = stars;
    this.discoverService.onRate(this.ratings, this.track);
  }

  favoriteButton(): void {
    this.track.favorite = !this.track.favorite;
    this.discoverService.onFavorite(this.fullFavorites, this.user, this.track);
  }
}
