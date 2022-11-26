import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario.model';
import { UsuariosService } from '../services/usuarios.service';

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
    senha:[{tipo:'required', aviso:'Escreva Algo'},{tipo:'minlength', aviso:'Senha não compativel'},],
  };

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, private route: Router) {}
  
  get email(){
    return this.loginForm.get('email');
  }

  get senha(){
    return this.loginForm.get('senha');
  }

  ngOnInit() { }

  async login(){
    if (this.loginForm.valid){
      const email = this.loginForm.get('email').value;
      const senha = this.loginForm.get('senha').value;
      const usuario: Usuario = (await this.usuariosService.login(
        email,
        senha
      )) as null as Usuario;

      if (usuario){
        this.route.navigateByUrl('/tabs/tab1');
      }else {
        alert('E-mail ou senha inválidos');
      } 
    }else{
      alert('Formulario Invalido!')
    }
  }

  async registroPage(){
    this.route.navigateByUrl('/registro');
  }
  
}
