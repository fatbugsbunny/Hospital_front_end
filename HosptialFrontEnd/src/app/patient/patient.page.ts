import { Component, OnInit } from '@angular/core';
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
import {Patient} from "../types";
import {PatientService} from "../services/patient.service";
import {AddPatientFormComponent} from "../popups/patient-popups/forms/add-patient-form/add-patient-form.component";
import {
  DeletePatientPopupComponent
} from "../popups/patient-popups/delete-patient-popup/delete-patient-popup.component";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCol, IonGrid, IonRow, IonSearchbar]
})
export class PatientPage implements OnInit {
  data!: Patient[];
  patients: Patient[] = [];

  constructor(public modalController: ModalController, private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getAllPatients().subscribe(patients => {this.patients = patients; this.data = patients});
  }

  // @ts-ignore
  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.patients = this.data.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }

  async openAddPatientForm(){
    const modal = await this.modalController.create({
      component: AddPatientFormComponent
    })
    return await modal.present();
  }

  async openDeletePatientPopup(id: number){
    const modal = await this.modalController.create({
      component: DeletePatientPopupComponent,
      componentProps: {
        id
      }
    })
    return await modal.present();
  }
}
