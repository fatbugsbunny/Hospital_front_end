import {Component, Inject, Input, OnInit} from '@angular/core';
import {Department} from "../../../types";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {DepartmentService} from "../../../services/department.service";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {ModalController} from "@ionic/angular/standalone";

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  standalone: true,
  styleUrls: ['./department-form.component.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule
  ]
})
export class DepartmentFormComponent implements OnInit{
  @Input() department!: Department;

  addDepartmentForm = new FormGroup({
    code: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
  });

  ngOnInit(){
    this.addDepartmentForm.controls.name.setValue(this.department.name);
    this.addDepartmentForm.controls.code.setValue(this.department.code);
  }

  constructor(
    private departmentService: DepartmentService,
    public modalController: ModalController
    ){}

  editDepartment() {
    console.log("Called")
    this.departmentService.editDepartment(this.department.id!,this.getFormData());
    this.dismiss();
  }

  dismiss(){
    this.modalController.dismiss({'dismissed': true});
  }

  private getFormData(): Department {
    const formValue = this.addDepartmentForm.value;
    return {
      code: formValue.code ?? '',
      name: formValue.name ?? '',
    };
  }
}
