import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';
import { PasswordValidator } from '../validators/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public form : FormGroup;
  public validationMessages = {
    'username': [
      { type: 'required', message: 'Nome de usuário é obrigatório.' },
      { type: 'minlength', message: 'Tamanho mínimo de 3 caracteres.' },
    ],
    'password': [
      { type: 'required', message: 'Senha é obrigatória.' },
      { type: 'minlength', message: 'Tamanho mínimo de 5 caracteres.' },
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirme a senha.' },
      { type: 'areEqual', message: 'Senhas precisam ser iguais.' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService : AutenticacaoService,
    private router : Router
  ) {
    this.form = this.formBuilder.group({
      username : ["", [
        Validators.required,
        Validators.minLength(3),
      ]],
      password : ["", [
        Validators.minLength(5),
        Validators.required,
      ]],
      confirmPassword : ["", [
        Validators.required
      ]]
    }, {
      validator: PasswordValidator.areEqual("password", "confirmPassword")
    });
  }

  submitForm() {
    const account = {
      username : this.form.get('username').value,
      password : this.form.get('password').value
    }
    this.authService.registerAccount(account).then(() => {
      this.router.navigate(["/login"]);
    })
  }
}
