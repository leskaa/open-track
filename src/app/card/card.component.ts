import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CardInfo } from '../models/CardInfo';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const defaultCardInfo: CardInfo = {
  track_id: 1,
  title: 'default',
  isTrack: true,
  author: 'unknown',
  description: 'lorem impsum',
  stars: 1,
  isRated: false,
  viewCount: 0,
  favorite: false,
  link: 'unknown',
};
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  faStar = faStar;
  faHeart = faHeart;

  @Input() cardInfo: CardInfo;
  constructor() {}

  ngOnInit(): void {
    this.cardInfo = { ...defaultCardInfo, ...this.cardInfo };
  }
}
