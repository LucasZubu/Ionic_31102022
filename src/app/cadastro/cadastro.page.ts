import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cadastro } from '../models/Cadastro.model';
import { CadastroService } from '../services/cadastro.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  cadastro : Cadastro = new Cadastro;

  cadastroForm = this.formBuilder.group({
    nome:         ['',Validators.compose([Validators.required, Validators.minLength(3)])],
    descricao:    ['',Validators.compose([Validators.required, Validators.maxLength(250)])],
    dataValidade: ['',Validators.compose([Validators.required])],
    preco:        ['',Validators.compose([Validators.required])],
 });

 menssagensErro = {
  nome: [{tipo:'required', aviso:'Escreva seu Nome'},
         {tipo:'minlength', aviso:'Nome não compativel'},],

  descricao:[{tipo:'required', aviso:'Escreva a descrição ae mano'},
         {tipo:'maxLength', aviso:'Menos ai'},],

  dataValidade: [{tipo:'required', aviso:'Coloca a data ai Filhão'},],       

  preco:[{tipo:'required', aviso:'Digite um preço ai'},],

};

get nome(){
  return this.cadastroForm.get('nome');
}

get descricao(){
  return this.cadastroForm.get('descricao');
}

get dataValidade(){
  return this.cadastroForm.get('dataValidade');
}

get preco(){
  return this.cadastroForm.get('preco');
}

  constructor(private formBuilder: FormBuilder, 
              private route: Router, 
              private cadastroService : CadastroService,
              private bd : StorageService){ }

  ngOnInit() {
  }

  async salvar(){
    //this.bd.set('email',this.pessoa)
    if (this.cadastroForm.valid){
      this.cadastro.nome = this.cadastroForm.get('nome').value;
      this.cadastro.descricao = this.cadastroForm.get('descricao').value;
      this.cadastro.dataValidade = this.cadastroForm.get('dataValidade').value;
      this.cadastro.preco = this.cadastroForm.get('preco').value;
      
      const id = await this.cadastroService.buscarId() as number;

      this.cadastro.id = id;

      this.cadastroService.salvar(this.cadastro);
      
      this.cadastroService.salvarId(id+1);
      alert('Sucesso!');   
      this.route.navigateByUrl('/tabs/tab1');
    }
    else{
         alert('Formulario Inválido');
    }
}

}
