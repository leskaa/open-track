import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { Material } from '../models/Material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {

  faArrowsAlt = faArrowsAlt;

  isEdit: boolean = false;
  form: FormGroup;

  @Input() material: Material;
  @Output() materialChange = new EventEmitter<Material>();
  @Output() delete = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(this.material.title, [
        Validators.required,
      ]),
      'website': new FormControl(this.material.website, [
        Validators.required,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
      ]),
      'description': new FormControl(this.material.description, [
        Validators.required,
      ])
    });
  }

  removeMaterial() {
    this.delete.emit(this.material.display_order);
  }

  saveChanges(material: Material) {
    this.material.title = this.form.controls['title'].value;
    this.material.website = this.form.controls['website'].value;
    this.material.description = this.form.controls['description'].value;
    this.materialChange.emit(this.material);
    this.isEdit = false;
  }

}
