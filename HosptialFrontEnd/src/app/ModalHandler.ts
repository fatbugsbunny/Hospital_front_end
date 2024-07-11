import {ErrorHandlePopupComponent} from "./popups/after-action-popup/error-handle-popup.component";
import {ModalController} from "@ionic/angular/standalone";
import {HttpErrorResponse} from "@angular/common/http";

export abstract class ModalHandler {
  public modalController:ModalController = new ModalController();

  protected constructor() {
  }

  protected async handleError(errorResponse:HttpErrorResponse) {
      const modal = await this.modalController.create({
        component: ErrorHandlePopupComponent,
        componentProps: {
          errorResponse: errorResponse
        }
      });
      await modal.present();
  }

  protected dismiss(){
    this.modalController.dismiss({dismissed:true});
  }
}
