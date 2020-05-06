import { Component, OnInit } from '@angular/core';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  faStar = faStar;
  faStarHalf = faStarHalf;

  constructor() {}

  ngOnInit(): void {}
}
