import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public form : FormGroup;
  public validationMessages = {
    'username': [
      { type: 'required', message: 'Nome de usuário é obrigatório.' },
      { type: 'minlength', message: 'Tamanho mínimo de 3 caracteres.' },
    ],
    'password': [
      { type: 'required', message: 'Senha é obrigatória.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService : AutenticacaoService,
    private router : Router,
    public toastController : ToastController
  ) {
    this.form = this.formBuilder.group({
      username : ["", [
        Validators.required,
        Validators.minLength(3),
      ]],
      password : ["", [
        Validators.required,
      ]]
    });
  }

  ionViewWillEnter() {
    this.authService.isRegistered().then(isRegistered => {
      if(!isRegistered)
        this.router.navigate(["/register"]);
    })
  }

  async presentToast(message : string, duration : number) {
    const toast = await this.toastController.create({
      message, duration
    });
    toast.present();
  }

  submitForm() {
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;
    this.authService.login(username, password).then(res => {
      if(res) {
        this.router.navigate(["/home"]);
      } else {
        this.presentToast("Credenciais incorretos.", 3000);
      }
    })
  }

  resetAccount() {
    this.authService.reset().then(() => {
      this.router.navigate(["/register"]);
    })
  }

}