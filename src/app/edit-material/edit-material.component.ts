import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { Material } from '../models/Material';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {

  faArrowsAlt = faArrowsAlt;

  isEdit: boolean = false;

  @Input() material: Material;
  @Output() materialChange = new EventEmitter<Material>();
  @Output() delete = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  removeMaterial() {
    this.delete.emit(this.material.display_order);
  }

  saveChanges(material: Material) {
    this.materialChange.emit(this.material);
    this.isEdit = false;
  }

}
