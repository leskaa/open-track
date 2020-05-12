import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Material } from '../models/Material';
import { TrackService } from '../track.service';
import { MaterialService } from '../material.service';
import { UserService } from '../user.service';
import { Track } from '../models/Track';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
})
export class CreatePageComponent implements OnInit {
  materials: Material[] = [];
  title: string = '';
  description: string = '';

  constructor(
    private trackService: TrackService,
    private materialService: MaterialService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.materials, event.previousIndex, event.currentIndex);
    this.materials.map((material, index) => {
      material.display_order = index;
    });
  }

  addMaterial() {
    const newMaterial: Material = {
      title: 'Title',
      author: this.userService.user_id,
      description: "Author's Notes",
      views: 0,
      website: 'https://example.com/',
      track: -1,
      display_order: this.materials.length,
    };
    this.materials.push(newMaterial);
    this.materials.map((material, index) => {
      material.display_order = index;
    });
  }

  deleteMaterial(removeOrder: number) {
    this.materials = this.materials.filter(
      (order) => order.display_order !== removeOrder
    );
  }

  createTrack() {
    const newTrack: Track = {
      title: this.title,
      description: this.description,
      author: this.userService.user_id,
      views: 0,
    };
    console.log(newTrack);
    let successes = 0;
    this.trackService.createTrack(newTrack).subscribe(
      (response) => {
        this.materials.forEach((material) => {
          material.track = response.track_id;
          this.materialService.createMaterial(material).subscribe(
            (response) => {
              successes += 1;
              if (successes === this.materials.length - 1) {
                this.router.navigate(['/discover']);
                this.snackBar.open(`Track Successfully Created!`, 'Dismiss', {
                  duration: 2000,
                });
              }
            },
            (error) => {
              console.log(error);
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
