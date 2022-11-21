import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from '../services/storage.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario : Usuario = new Usuario;        
  pessoa = {};
  
  registroForm = this.formBuilder.group({
    nome:         ['',Validators.compose([Validators.required, Validators.minLength(3)])],
    email:        ['',Validators.compose([Validators.required, Validators.email])],
    cpf:          ['',Validators.compose([Validators.required, Validators.minLength(11),Validators.maxLength(14)])],
    senha:        ['',Validators.compose([Validators.required, Validators.minLength(8)])], 
    confirmasenha: ['',Validators.compose([Validators.required, Validators.minLength(8)])],
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


  constructor(private formBuilder: FormBuilder, private bd: StorageService, 
     private usuariosService : UsuariosService,
     private route: Router) { }

  get nome(){
       return this.registroForm.get('nome');
     }
  get email(){
       return this.registroForm.get('email');
       } 
  get cpf(){
       return this.registroForm.get('cpf');
       } 
                      
  get confirmasenha(){
       return this.registroForm.get('confirmasenha');
       }   

  get senha(){
       return this.registroForm.get('senha');
     }
   
     ngOnInit() { }

     async salvar(){
          this.bd.set('email',this.pessoa)
          if (this.registroForm.valid){
            this.usuario.nome = this.registroForm.get('nome').value;
            this.usuario.email = this.registroForm.get('email').value;
            this.usuario.cpf = this.registroForm.get('cpf').value;
            this.usuario.senha = this.registroForm.get('senha').value;
            
            const id = await this.usuariosService.buscarId() as number;

            this.usuario.id = id;

            this.usuariosService.salvar(this.usuario);
            
            this.usuariosService.salvarId(id+1);
            alert('Sucesso!');   
            this.route.navigateByUrl('/login');
          }
          else{
               alert('Formulario Inválido');
          }
     }
}
