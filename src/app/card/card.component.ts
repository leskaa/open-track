import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CardInfo } from '../models/CardInfo';

const defaultCardInfo: CardInfo = {
  track_id: 1,
  title: 'default',
  isTrack: true,
  author: 'unknown',
  description: 'lorem impsum',
  stars: 1,
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
  faHeart = faHeart;

  @Input() cardInfo: CardInfo;

  constructor() {}

  ngOnInit(): void {
    this.cardInfo = { ...defaultCardInfo, ...this.cardInfo };
  }
}
