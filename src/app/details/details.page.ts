import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  @Input() name : string;
  @Input() login : string;
  @Input() password : string;

  constructor(public modalController : ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss({
      'dismissed' : true,
    });
  }

}
