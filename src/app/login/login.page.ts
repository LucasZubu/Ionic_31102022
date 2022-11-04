import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = this.formBuilder.group({
     email: ['',Validators.compose([Validators.required, Validators.email])],
     senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  menssagensErro = {
    email:[{tipo:'required', aviso:'Escreva Algo'},{tipo:'email', aviso:'Digite um E-mail'},],
    senha:[{tipo:'required', aviso:'Escreva Algo'},{tipo:'minLength', aviso:'Senha não compativel'},],
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
  }

}
