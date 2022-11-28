import { Injectable } from '@angular/core';
import { Cadastro } from '../models/Cadastro.model';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  listaCadastro: Cadastro[] = [];
  constructor(private storageService : StorageService) { }

  async buscarTodos() {
    // unknow é pra quando for vazio e quando n for é a lista de usuarios
    //pra n dar erro quando vazio o if que se ouver nenhum registro retornar uma lista vazia.
    this.listaCadastro = await this.storageService.get('cadastro') as unknown as Cadastro[];
    if (!this.listaCadastro){
     this.listaCadastro = []
    }
    return this.listaCadastro;    
   }

   async salvar(cadastro: Cadastro) { 
    await this.buscarTodos();
    //para inserir é necessario informar o usuario antes de imprimir como o generate de um banco.  
    this.listaCadastro[cadastro.id] = cadastro;
    await this.storageService.set('cadastro',this.listaCadastro);
  }

  // if pra quaando n tiver nenhum usuario retornar 0
  async buscarId() { 
    const id = await this.storageService.get('idCadastro');
    if (!id){ 
      return 0;    
    }
    return id;
  }

  async salvarId(id: number) { 
    await this.storageService.set('idCadastro',id);
  }
}
