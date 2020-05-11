import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Track } from '../models/Track';
import { TrackService } from '../track.service';
import { MaterialService } from '../material.service';
import { Material } from '../models/Material';
import { CardInfo } from '../models/CardInfo';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css'],
})
export class TrackPageComponent implements OnInit {
  faHeart = faHeart;
  track: Track;
  materials: CardInfo[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private trackService: TrackService,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    this.getMaterials();
  }

  async getMaterials(): Promise<void> {
    try {
      const id = +this.route.snapshot.paramMap.get('id');
      const currTrack = await this.trackService.getTrackById(id).toPromise();
      this.track = currTrack;
      this.track.materials.forEach((material) => {
        const card: CardInfo = {
          track_id: id,
          title: material.title,
          isTrack: false,
          author: this.track.author.username,
          description: material.description,
          stars: this.track.rating,
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
}
