import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Material } from '../models/Material';
import { TrackService } from '../track.service';
import { MaterialService } from '../material.service';
import { UserService } from '../user.service';
import { Track } from '../models/Track';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-track-page',
  templateUrl: './edit-track-page.component.html',
  styleUrls: ['./edit-track-page.component.css']
})
export class EditTrackPageComponent implements OnInit {
  materials: Material[] = [];
  track: Track;
  form: FormGroup;
  @Input() track_id;

  constructor(
    private trackService: TrackService,
    private materialService: MaterialService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.trackService.getTrackById(this.track_id).subscribe(
      (response) => {
        this.track = response;
        this.track.author = this.track.author.id;
        this.materials = response.materials;
        this.form = new FormGroup({
          'title': new FormControl(this.track.title, [
            Validators.required,
          ]),
          'description': new FormControl(this.track.description, [
            Validators.required,
          ])
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

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

  updateTrack() {
    this.track.title = this.form.controls['title'].value;
    this.track.description = this.form.controls['description'].value;
    const { materials, rating, ...updatedTrack } = this.track;
    let successes = 0;
    this.trackService.updateTrack(updatedTrack).subscribe(
      (response) => {
        this.materials.forEach((material) => {
          if (material.material_id !== undefined) {
            this.materialService.updateMaterial(material).subscribe(
              (response) => {
                successes += 1;
                if (successes === this.materials.length - 1) {
                  this.router.navigate([`/discover`]);
                  this.snackBar.open(`Track Successfully Updated!`, 'Dismiss', {
                    duration: 2000,
                  });
                }
              },
              (error) => {
                console.log(error);
              }
            )
          } else {
            material.track = response.track_id;
            this.materialService.createMaterial(material).subscribe(
              (response) => {
                successes += 1;
                if (successes === this.materials.length - 1) {
                  this.router.navigate([`/discover`]);
                  this.snackBar.open(`Track Successfully Updated!`, 'Dismiss', {
                    duration: 2000,
                  });
                }
              },
              (error) => {
                console.log(error);
              }
            )
          }
          
        })
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
