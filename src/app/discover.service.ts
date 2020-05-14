import { Injectable } from '@angular/core';
import { TrackService } from './track.service';
import { CardInfo } from './models/CardInfo';
import { Track } from './models/Track';
import { UserService } from './user.service';
import { User } from './models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscoverService {
  private searchSource = new BehaviorSubject<string>('');
  search = this.searchSource.asObservable();

  trackArray: Track[] = [];
  tracks: CardInfo[] = [];
  user: User;
  favorites: any[] = [];
  favoriteTracks: number[] = [];
  ratingsArray: any[] = [];

  constructor(
    private trackService: TrackService,
    private userService: UserService
  ) {}

  sendSearch(search: string) {
    this.searchSource.next(search);
  }

  async createDiscover(): Promise<any[]> {
    this.trackArray = [];
    this.tracks = [];
    this.favorites = [];
    this.favoriteTracks = [];
    this.ratingsArray = [];
    try {
      const currUser = await this.userService.getUser().toPromise();
      this.user = currUser;
      console.log(this.user);
      const favorites = await this.trackService.getFavorites().toPromise();
      this.favorites = favorites;
      favorites.forEach((fav) => {
        if (fav.user_fk === this.user.pk) {
          this.favoriteTracks.push(fav.track_fk);
        }
      });
      const ratings = await this.trackService.getRatings().toPromise();
      ratings.forEach((rating) => {
        if (rating.user_fk === this.user.pk) {
          this.ratingsArray.push(rating);
        }
      });
      const tracks = await this.trackService.getTracks().toPromise();
      this.trackArray = tracks;
      this.trackArray.forEach((track) => {
        let rating = track.rating;
        let isRated = false;
        const found = this.ratingsArray.findIndex(
          (element) => element.track_fk === track.track_id
        );
        if (found !== -1) {
          rating = ratings[found].rating;
          isRated = true;
        }
        const card = {
          track_id: track.track_id,
          title: track.title,
          isTrack: true,
          author: track.author.username,
          description: track.description,
          stars: rating,
          isRated: isRated,
          viewCount: track.views,
          favorite: this.favoriteTracks.includes(track.track_id),
          link: track.materials.length + ' Materials',
        };
        this.tracks.push(card);
      });
    } catch (err) {
      console.log(err);
      const tracks = await this.trackService.getTracks().toPromise();
      this.trackArray = tracks;
      this.trackArray.forEach((track) => {
        const card = {
          track_id: track.track_id,
          title: track.title,
          isTrack: true,
          author: track.author.username,
          description: track.description,
          stars: track.rating,
          isRated: false,
          viewCount: track.views,
          favorite: false,
          link: track.materials.length + ' Materials',
        };
        this.tracks.push(card);
      });
      return [
        undefined,
        undefined,
        undefined,
        this.tracks,
        undefined,
        this.trackArray,
      ];
    }
    return [
      this.user,
      this.favoriteTracks,
      this.ratingsArray,
      this.tracks,
      this.favorites,
      this.trackArray,
    ];
  }

  isRated(ratings: any[], track_id: number): boolean {
    let isRated = false;
    const found = ratings.findIndex((element) => element.track_fk === track_id);
    if (found !== -1) {
      isRated = true;
    }
    return isRated;
  }

  isFavorite(favorites: number[], track_id: number): boolean {
    return favorites.includes(track_id);
  }

  async onRate(ratings: any[], track: CardInfo): Promise<void> {
    try {
      const found = ratings.findIndex(
        (element) => element.track_fk === track.track_id
      );
      if (found !== -1) {
        await this.trackService
          .deleteRating(this.ratingsArray[found].track_rating_id)
          .toPromise();
      }
      await this.trackService
        .createRating(track.stars, this.user.pk, track.track_id)
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  async onFavorite(
    favorites: any[],
    user: User,
    track: CardInfo
  ): Promise<void> {
    try {
      if (track.favorite) {
        await this.trackService
          .createFavorite(user.pk, track.track_id)
          .toPromise();
      } else {
        favorites.forEach((element) => {
          if (element.track_fk === track.track_id) {
            this.trackService
              .deleteFavorite(element.track_favorite_id)
              .toPromise();
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
