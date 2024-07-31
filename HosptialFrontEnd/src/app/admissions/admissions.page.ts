import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow, IonSearchbar,
  IonTitle,
  IonToolbar, ModalController
} from '@ionic/angular/standalone';
import {AdmissionState} from "../types";
import {PatientService} from "../services/patient.service";
import {
  DischargePatientPopupComponent
} from "../popups/patient-popups/discharge-patient-popup/discharge-patient-popup.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AdmitPatientFormComponent} from "../popups/patient-popups/forms/admit-patient-form/admit-patient-form.component";
import {firstValueFrom} from "rxjs";
import {
  ChangeClinicalDataFormComponent
} from "../popups/patient-popups/forms/change-clinical-data-form/change-clinical-data-form.component";

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.page.html',
  styleUrls: ['./admissions.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonButton, IonSearchbar]
})

export class AdmissionsPage implements OnInit {
  patientId: number = 0;

  admissions: AdmissionState[] = [];
  admissionsData: AdmissionState[] = [];

  constructor(private route: ActivatedRoute, private patientService: PatientService, public modalController: ModalController) { }

 async ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = params['patientId'];
    })
    this.admissionsData = await firstValueFrom(this.patientService.getAllAdmissionStates(this.patientId));
    this.admissions = this.admissionsData;
    this.admissions.reverse();
    console.log(this.admissions);
  }

  async openDischargePopup(){
    const modal = await this.modalController.create({
      component: DischargePatientPopupComponent,
      componentProps: {
        patientId: this.patientId,
      }
    })
    return await modal.present();
  }

  async openAdmitPatientForm(){
    const modal = await this.modalController.create({
      component: AdmitPatientFormComponent,
      componentProps: {
        patientId: this.patientId,
      }
    })
    return await modal.present();
  }

  async openChangeClinicalDataPopup() {
    const modal = await this.modalController.create({
      component: ChangeClinicalDataFormComponent,
      componentProps: {
        patientId: this.patientId,
      }
    })
    return await modal.present();
  }

  // @ts-ignore
  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.admissions = this.admissionsData.filter((d) => d.enteringDate.toLowerCase().indexOf(query) > -1);
  }

}
