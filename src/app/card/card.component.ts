import { Component, OnInit, Input } from '@angular/core';
import { faHeart, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { CardInfo } from './../CardInfo';

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

  ngOnInit(): void {}
}
