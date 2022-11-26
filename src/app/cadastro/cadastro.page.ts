import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
 
  cadastroForm = this.formBuilder.group({
    nome:         ['',Validators.compose([Validators.required, Validators.minLength(3)])],
    descricao:    ['',Validators.compose([Validators.required, Validators.maxLength(250)])],
    dataValidade: ['',Validators.compose([Validators.required])],
    preco:        ['',Validators.compose([Validators.required])],
 });

 menssagensErro = {
  nome: [{tipo:'required', aviso:'Escreva seu Nome'},
         {tipo:'minlength', aviso:'Nome não compativel'},],

  descricao:[{tipo:'required', aviso:'Escreva seu E-mail'},
         {tipo:'maxLength', aviso:'Menos ai'},],

  dataValidade: [{tipo:'required', aviso:'Coloca a data ai Filhão'},],       

  preco:[{tipo:'required', aviso:'Digite um preço ai'},],

};


  constructor(private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
  }

}
