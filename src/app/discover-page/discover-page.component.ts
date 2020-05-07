import { Component, OnInit } from '@angular/core';
import { MaterialService } from './../material.service';
import { CardInfo } from '../CardInfo';

@Component({
  selector: 'app-discover-page',
  templateUrl: './discover-page.component.html',
  styleUrls: ['./discover-page.component.css'],
})
export class DiscoverPageComponent implements OnInit {
  constructor(private materialService: MaterialService) {}

  cards: CardInfo[] = [];

  ngOnInit(): void {
    this.materialService.getMaterials().subscribe((data) => {});
  }
}
