import {Component, Input, OnInit} from '@angular/core';
import {ModalHandler} from "../../../../ModalHandler";
import {PatientService} from "../../../../services/patient.service";
import {Form, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {catchError, firstValueFrom} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {Department} from "../../../../types";
import {DepartmentService} from "../../../../services/department.service";

@Component({
  standalone: true,
  selector: 'app-admit-patient-popup',
  templateUrl: './admit-patient-form.component.html',
  styleUrls: ['./admit-patient-form.component.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    NgForOf
  ]
})
export class AdmitPatientFormComponent extends ModalHandler implements OnInit{
  @Input() patientId!: number;
  departments: Department[] = [];

  admissionStateForm: FormGroup = new FormGroup({
    enteringDate: new FormControl(this.getCurrentFormattedDate()),
    exitingDate: new FormControl(),
    cause: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    discharge: new FormControl(false),
  })

  department: FormControl = new FormControl('', Validators.required);
  clinicalData: FormControl = new FormControl('', Validators.required);

  constructor(private departmentService: DepartmentService, private patientService: PatientService) {
    super()
  }

  ngOnInit(){
    this.departmentService.getAllDepartments().subscribe(next => this.departments = next);
  }

  async admitPatient() {
    await firstValueFrom(this.patientService.addAdmissionState(this.patientId, this.admissionStateForm.value).pipe(catchError((error: HttpErrorResponse) => this.handleError(error))));

    await firstValueFrom(this.patientService.setClinicalData(this.patientId, this.clinicalData.value).pipe(catchError((error: HttpErrorResponse) => this.handleError(error))));

    this.patientService.setDepartment(this.patientId, this.department.value).pipe(catchError((error: HttpErrorResponse) => this.handleError(error))).subscribe(async response => {
      if (response) {
        this.refreshPage()
      }
    });
    this.dismiss();
  }

  getCurrentFormattedDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}
