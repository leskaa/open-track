import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {

  public materials = [];

  selectedMaterial;

  constructor(private _materialService: MaterialService) { }

  ngOnInit() {
    this.getMaterials();
    this.selectedMaterial = {material_id: -1, title: '', description: '', views: '', website: '', track: '', display_order: ''}
  }

  getMaterials = () => {
    this._materialService.getMaterials().subscribe(
      data => {
        this.materials = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  selectMaterial(material) {
    this._materialService.getMaterialById(material.material_id).subscribe(
      data => {
        this.selectedMaterial = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateMaterial = () => {
    this._materialService.updateMaterial(this.selectedMaterial.material_id).subscribe(
      data => {
        this.getMaterials();
      },
      error => {
        console.log(error);
      }
    );
  }

  createMaterial = () => {
    this._materialService.createMaterial(this.selectedMaterial).subscribe(
      data => {
        this.materials.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteMaterial = () => {
    this._materialService.deleteMaterial(this.selectedMaterial.material_id).subscribe(
      data => {
        this.getMaterials();
      },
      error => {
        console.log(error);
      }
    );
  }
}
