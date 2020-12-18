import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { RepeatValidator } from '../validators/repeat-validator';

interface Account {
  name : string;
  login : string;
  password : string;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage {

  public form : FormGroup;

  @Input() name : string;
  @Input() login : string;
  @Input() password : string;
  @Input() accountList : Account[];

  private oldName : string;

  public validationMessages = {
    'name': [
      { type: 'required', message: 'Nome é obrigatório.' },
      { type: 'isRepeated', message: 'Nome já existente.' },
    ],
    'login': [
      { type: 'required', message: 'Login é obrigatório.' }
    ],
    'password': [
      { type: 'required', message: 'Senha é obrigatória.' }
    ]
  };

  constructor(
    public modalController : ModalController, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.oldName = this.name;
    this.form = this.formBuilder.group({
      name : [this.name, [
        Validators.required
      ]],
      login : [this.login, [
        Validators.required
      ]],
      password : [this.password, [
        Validators.required
      ]],
    }, {
      validator: RepeatValidator.isRepeated("name", this.accountList.map(account => { if (account.name !== this.oldName) return account.name }))
    });
  }

  save() {
    const account : Account = {
      name : this.form.get("name").value,
      login : this.form.get("login").value,
      password : this.form.get("password").value
    }
    this.modalController.dismiss({
      'dismissed' : true,
      'save' : true,
      'oldName' : this.oldName,
      account
    });
  }

  close() {
    this.modalController.dismiss({
      'dismissed' : true,
    });
  }

}
