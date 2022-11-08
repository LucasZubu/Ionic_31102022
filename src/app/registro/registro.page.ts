import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm = this.formBuilder.group({
    nome:         ['',Validators.compose([Validators.required, Validators.minLength(3)])],
    email:        ['',Validators.compose([Validators.required, Validators.email])],
    cpf:          ['',Validators.compose([Validators.required, Validators.minLength(11),Validators.maxLength(14)])],
    senha:        ['',Validators.compose([Validators.required, Validators.minLength(8)])], 
    confirmsenha: ['',Validators.compose([Validators.required, Validators.minLength(8)])],
 });

 menssagensErro = {
  nome: [{tipo:'required', aviso:'Escreva seu Nome'},
         {tipo:'minlength', aviso:'Nome não compativel'},],

  email:[{tipo:'required', aviso:'Escreva seu E-mail'},
         {tipo:'email', aviso:'Digite um E-mail'},],

  cpf: [{tipo:'required', aviso:'Escreva seu Nome'},
        {tipo:'minlength', aviso:'Um pouco mais'},
        {tipo:'maxlength', aviso:'Estourou o limite'}],       

  senha:[{tipo:'required', aviso:'Digite a senha'},
         {tipo:'minlength', aviso:'Senha não compativel'},],

  confirmasenha:[{tipo:'required', aviso:'Confirme a senha'},
         {tipo:'minlength', aviso:'Confirmação não compativel'},],
};


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
