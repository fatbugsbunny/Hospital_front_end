import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Department, Patient} from "../../../../types";
import {ModalHandler} from "../../../../ModalHandler";
import {IonicModule} from "@ionic/angular";
import {PatientService} from "../../../../services/patient.service";
import {catchError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  standalone: true,
  selector: 'app-edit-patient-form',
  templateUrl: './edit-patient-form.component.html',
  styleUrls: ['./edit-patient-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonicModule
  ]
})
export class EditPatientFormComponent extends ModalHandler implements OnInit {
  @Input() patient!: Patient;

  patientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
  })

  ngOnInit() {
    this.patientForm.controls.name.setValue(this.patient.name);
    this.patientForm.controls.lastName.setValue(this.patient.lastName);
    this.patientForm.controls.birthDate.setValue(this.patient.birthDate);
  }

  constructor(private patientService: PatientService) {
    super()
  }

  updatePatient() {
    this.patientService.updatePatient(this.patient.id!, this.getFormData()).pipe(catchError((error: HttpErrorResponse) => this.handleError(error))).subscribe(async response => {
      if (response){this.refreshPage()}
    });
    this.dismiss();
  }

  private getFormData(): Patient {
    const formValue = this.patientForm.value;
    return {
      id: this.patient.id,
      name: formValue.name ?? '',
      lastName: formValue.lastName ?? '',
      birthDate: formValue.birthDate ?? '',
    };
  }
}
