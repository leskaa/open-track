import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { CardInfo } from '../models/CardInfo';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnChanges {
  faStar = faStar;
  faStarHalf = faStarHalf;
  hasHalfStar: boolean = false;
  stars: number[] = [];

  @Input() cardInfo: CardInfo;

  constructor() {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.calcStars();
  }

  calcStars(): void {
    this.cardInfo.stars = Math.round(this.cardInfo.stars * 2) / 2;
    if (!Number.isInteger(this.cardInfo.stars)) {
      this.hasHalfStar = true;
    }
    this.stars = Array(Math.floor(this.cardInfo.stars)).fill(0);
  }
}
