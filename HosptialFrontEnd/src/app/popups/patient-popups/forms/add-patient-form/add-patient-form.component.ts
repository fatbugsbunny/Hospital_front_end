import {Component, OnInit} from '@angular/core';
import {ModalHandler} from "../../../../ModalHandler";
import {PatientService} from "../../../../services/patient.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {catchError, firstValueFrom, interval, map, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {IonicModule} from "@ionic/angular";
import {DepartmentService} from "../../../../services/department.service";
import {ClinicalData, Department} from "../../../../types";
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-add-patient-form',
  templateUrl: './add-patient-form.component.html',
  styleUrls: ['./add-patient-form.component.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AddPatientFormComponent extends ModalHandler implements OnInit {
  departments: Department[] = [];

  patientForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
  });

  admissionStateForm: FormGroup = new FormGroup({
    enteringDate: new FormControl(this.getCurrentFormattedDate()),
    exitingDate: new FormControl(null),
    cause: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    discharge: new FormControl(false),
  })

  clinicalData: FormControl = new FormControl('', Validators.required);
  department: FormControl = new FormControl('', Validators.required);

  constructor(private patientService: PatientService, private departmentService: DepartmentService) {
    super()
  }

    ngOnInit() {
    this.departmentService.getAllDepartments().subscribe(next => this.departments = next);
  }

  async addPatient() {
    const addedPatient = await firstValueFrom(this.patientService.addPatient(this.patientForm.value).pipe(
    catchError((error: HttpErrorResponse) => this.handleError(error))));

    await firstValueFrom(this.patientService.addAdmissionState(addedPatient.id, this.admissionStateForm.value).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))));
    this.patientService.setDepartment(addedPatient.id, this.department.value).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))).subscribe();
     this.patientService.setClinicalData(addedPatient.id, {clinicalRecord: this.clinicalData.value}).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))).subscribe();
     this.dismiss();
     this.refreshPage()
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
