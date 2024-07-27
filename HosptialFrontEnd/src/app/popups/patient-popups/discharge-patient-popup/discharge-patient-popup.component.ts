import {Component, Input, OnInit} from '@angular/core';
import {ModalHandler} from "../../../ModalHandler";
import {PatientService} from "../../../services/patient.service";
import {catchError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonRow,
  IonSelect, IonSelectOption
} from "@ionic/angular/standalone";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-discharge-patient-popup',
  templateUrl: './discharge-patient-popup.component.html',
  styleUrls: ['./discharge-patient-popup.component.scss'],
  imports: [
    IonCardHeader,
    IonCard,
    IonButton,
    IonCardSubtitle,
    IonGrid,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class DischargePatientPopupComponent extends ModalHandler {
  @Input() patientId!: number;
  reasons: string[] = ["Healthy","Transfer","Death"];
  reasonForm: FormControl = new FormControl('', [Validators.required]);

  constructor(private patientService: PatientService) {
    super()
  }

  dischargePatient() {
    this.patientService.dischargePatient(this.patientId, this.reasonForm.value).pipe(catchError((error: HttpErrorResponse) => this.handleError(error))).subscribe(async response => {
      if (response) {
        this.refreshPage()
      }
    });
    this.dismiss();
  }
}
