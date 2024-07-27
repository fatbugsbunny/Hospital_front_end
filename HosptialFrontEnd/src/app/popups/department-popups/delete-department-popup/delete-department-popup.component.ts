import {Component, Input, OnInit} from '@angular/core';
import {Department} from "../../../types";
import {DepartmentService} from "../../../services/department.service";
import {IonButton, IonCard, IonCardHeader, IonContent, ModalController} from "@ionic/angular/standalone";
import {ModalHandler} from "../../../ModalHandler";
import {catchError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-delete-department-popup',
  templateUrl: './delete-department-popup.component.html',
  styleUrls: ['./delete-department-popup.component.scss'],
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonButton
  ]
})
export class DeleteDepartmentPopupComponent extends ModalHandler {
  @Input() id!: number;

  constructor(
              private departmentService: DepartmentService,
  ) {
    super();
  }

  deleteDepartment() {
    this.departmentService.deleteDepartment(this.id).pipe(catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse))).subscribe(async response => {
      if (response) {
        this.refreshPage();
      }
    });
    this.dismiss();
  }
}
