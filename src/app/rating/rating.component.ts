import { Component, OnInit, Input } from '@angular/core';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  faStar = faStar;
  faStarHalf = faStarHalf;
  hasHalfStar: boolean = false;
  stars: number[] = [];

  @Input() rating: number;

  constructor() {}

  ngOnInit(): void {
    this.rating = Math.round(this.rating * 2) / 2;
    if (!Number.isInteger(this.rating)) {
      this.hasHalfStar = true;
    }
    this.stars = Array(Math.floor(this.rating)).fill(0);
  }
}
