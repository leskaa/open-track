import { Component, OnInit } from '@angular/core';
import { faHeart, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
})
export class MaterialComponent implements OnInit {
  faHeart = faHeart;
  faEllipsisV = faEllipsisV;

  constructor() {}

  ngOnInit(): void {}
}
