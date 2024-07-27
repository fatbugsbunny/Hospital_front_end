import {ErrorHandlePopupComponent} from "./popups/error-handle-popup/error-handle-popup.component";
import {ModalController} from "@ionic/angular/standalone";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {HttpResponse} from "@capacitor/core";

export abstract class ModalHandler {
  public modalController: ModalController = new ModalController();
  protected router: Router = new Router();

  protected constructor() {
  }

  protected async handleError(errorResponse: HttpErrorResponse) {
    const modal = await this.modalController.create({
      component: ErrorHandlePopupComponent,
      componentProps: {
        errorResponse: errorResponse
      }
    });
    await modal.present();
  }

  protected dismiss() {
    this.modalController.dismiss({dismissed: true});
  }

  protected refreshPage() {
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload()})
    }
}
