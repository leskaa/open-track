import { Component, OnInit, Input } from '@angular/core';
import { faHeart, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { CardInfo } from './../CardInfo';

const defaultCardInfo: CardInfo = {
  title: 'default',
  isTrack: true,
  author: 'unknown',
  description: 'lorem impsum',
  stars: 1,
  viewCount: 0,
  favorite: false,
  link: 'unknown'
};
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  faHeart = faHeart;
  faEllipsisV = faEllipsisV;

  @Input() cardInfo: CardInfo;

  constructor() {}

  ngOnInit(): void {
    this.cardInfo = { ...defaultCardInfo, ...this.cardInfo };
  }
}
