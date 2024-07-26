import {Component, Input, OnInit} from '@angular/core';
import {PatientService} from "../../../services/patient.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs";
import {ModalHandler} from "../../../ModalHandler";
import {IonButton, IonCard, IonCardHeader} from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: 'app-delete-patient-popup',
  templateUrl: './delete-patient-popup.component.html',
  styleUrls: ['./delete-patient-popup.component.scss'],
  imports: [
    IonButton,
    IonCard,
    IonCardHeader
  ]
})
export class DeletePatientPopupComponent extends ModalHandler {
  @Input() id!: number;

  constructor(private router: Router, private patientService: PatientService) {
    super();
  }

  deletePatient() {
    this.patientService.deletePatient(this.id).pipe(catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse))).subscribe(async response => {
      if (!response) {
        this.router.navigate([this.router.url]).then(() => window.location.reload())
      }
    });
    this.dismiss();
  }

}
