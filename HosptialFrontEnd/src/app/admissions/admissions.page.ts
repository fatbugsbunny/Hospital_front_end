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
import {AdmitPatientPopupComponent} from "../popups/patient-popups/admit-patient-popup/admit-patient-popup.component";
import {firstValueFrom} from "rxjs";

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

  async openDischargePopup(patientId: number){
    const modal = await this.modalController.create({
      component: DischargePatientPopupComponent,
      componentProps: {
        patientId,
      }
    })
    return await modal.present();
  }

  async openAdmitPatientForm(){
    const modal = await this.modalController.create({
      component: AdmitPatientPopupComponent,
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
