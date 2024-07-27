import {Component, Input, OnInit} from '@angular/core';
import {ModalHandler} from "../../../../ModalHandler";
import {PatientService} from "../../../../services/patient.service";
import {catchError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {IonButton, IonCard, IonCardHeader, IonSelect, IonSelectOption} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {Department} from "../../../../types";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {DepartmentService} from "../../../../services/department.service";

@Component({
  standalone: true,
  selector: 'app-change-department-form',
  templateUrl: './change-department-form.component.html',
  styleUrls: ['./change-department-form.component.scss'],
  imports: [

    NgForOf,
    ReactiveFormsModule,
    IonCard,
    IonCardHeader,
    IonSelect,
    IonSelectOption,
    IonButton
  ]
})
export class ChangeDepartmentFormComponent extends ModalHandler implements OnInit {
  @Input() patientId!: number;
  departments: Department[] = [];

  department: FormControl = new FormControl('', Validators.required);


  constructor(private departmentService: DepartmentService, private patientService: PatientService) {
    super()
  }

  ngOnInit() {
    this.departmentService.getAllDepartments().subscribe(next => this.departments = next);
  }

  changeDepartment() {
    this.patientService.setDepartment(this.patientId,this.department.value).pipe(catchError((error:HttpErrorResponse)=>this.handleError(error))).subscribe(async response => {if (response){this.refreshPage()}})
    this.dismiss();
  }

}
