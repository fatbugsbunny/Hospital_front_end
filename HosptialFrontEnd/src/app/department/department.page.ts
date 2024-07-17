import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonGrid, IonRow, IonCol, IonButton, IonModal, IonButtons, IonInput, ModalController, IonSearchbar
} from '@ionic/angular/standalone';
import {DepartmentService} from "../services/department.service";
import {Department} from "../types";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditDepartmentFormComponent} from "../popups/department-popups/forms/edit-department-form/edit-department-form.component";
import {
  DeleteDepartmentPopupComponent
} from "../popups/department-popups/delete-department-popup/delete-department-popup.component";
import {
  AddDepartmentFormComponent
} from "../popups/department-popups/forms/add-department-form/add-department-form.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-department',
  templateUrl: 'department.page.html',
  styleUrls: ['department.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, CommonModule, IonButton, ReactiveFormsModule, IonModal, IonButtons, IonInput, FormsModule, IonSearchbar],
})
export class DepartmentPage implements OnInit{
  data!: Department[];
  departments: Department[] = [];

  constructor(public modalController: ModalController
, private departmentService: DepartmentService) {}

  ngOnInit(){
    this.departmentService.getAllDepartments().subscribe(departments => {this.data = departments; this.departments = departments});
  }

  async openEditDepartmentForm(department: Department){
    const modal = await this.modalController.create({
      component: EditDepartmentFormComponent,
      cssClass: 'deleteDepartmentPopUp',
      componentProps: {
        department,
      }
    });
    return await modal.present();
  }

  async openDeleteDepartmentPopup(id: number){
    const modal = await this.modalController.create({
      component: DeleteDepartmentPopupComponent,
      componentProps:{
        id
      }
    });
    return await modal.present();
  }

  async openAddDepartmentForm(){
    const modal = await this.modalController.create({
      component: AddDepartmentFormComponent
    });
    return await modal.present()
  }

  // @ts-ignore
  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.departments = this.data.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }
}


