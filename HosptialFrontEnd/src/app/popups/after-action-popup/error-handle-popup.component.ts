import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ModalController} from "@ionic/angular/standalone";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  standalone: true,
  selector: 'app-error-handle-popup-component',
  templateUrl: './error-handle-popup.component.html',
  styleUrls: ['./error-handle-popup.component.scss'],
  imports: [
    IonicModule
  ]
})
export class ErrorHandlePopupComponent {
  @Input() errorResponse!: HttpErrorResponse;

  constructor(public modalController: ModalController) { }

  dismiss(){
    this.modalController.dismiss({dismissed: true});
  }

}
