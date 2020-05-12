import { Component, OnInit } from '@angular/core';
import { DiscoverService } from 'src/app/discover.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  input: string = '';

  constructor(private discoverService: DiscoverService) {}

  ngOnInit(): void {
    this.discoverService.search.subscribe((result) => (this.input = result));
  }

  onSearch(): void {
    this.discoverService.sendSearch(this.input);
  }

  clear(): void {
    this.input = '';
  }
}
