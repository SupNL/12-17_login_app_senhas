import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {

  @Input() name : string;
  @Input() login : string;
  @Input() password : string;

  constructor(public modalController : ModalController) { }

  close() {
    this.modalController.dismiss({
      'dismissed' : true,
    });
  }

}
