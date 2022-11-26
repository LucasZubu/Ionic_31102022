import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  /**
   * Toda tabela no banco necessita de uma classe.
   * Para utilizar a classe de usuarios é necessario transformar o objeto usuario{} tem que ser transformado na lista usuario[]
   * @param usuarioService 
   * Declarados em () são como parametros das funções
   * Para consultas é necessario o comando return
   * O comando Await
   */
  // Toda vez que for crriar um serviço precisa declarar no contrutor para ser instanciado na classe

  listaUsuarios: Usuario[] = [];
  constructor(private storageService: StorageService) { }
  
  async login(email:string, senha:string){
    await this.buscarTodos();
    let usuario: Usuario;
    this.listaUsuarios.filter(item =>{
      if (item.email.toLocaleLowerCase() == email.toLocaleLowerCase()){
        usuario = item;
      }
    });
    if (usuario?.senha === senha){
      return usuario;
    }


    return null;
  }


  async salvar(usuario: Usuario) { 
    await this.buscarTodos();
    //para inserir é necessario informar o usuario antes de imprimir como o generate de um banco.  
    this.listaUsuarios[usuario.id] = usuario;
    await this.storageService.set('usuarios',this.listaUsuarios);
  }

  async buscarUm(id: number) {
    await this.buscarTodos();
    return this.listaUsuarios[id];
   }

  async buscarTodos() {
    // unknow é pra quando for vazio e quando n for é a lista de usuarios
    //pra n dar erro quando vazio o if que se ouver nenhum registro retornar uma lista vazia.
    this.listaUsuarios = await this.storageService.get('usuarios') as unknown as Usuario[];
    if (!this.listaUsuarios){
     this.listaUsuarios = []
    }
    return this.listaUsuarios;    
   }

  async deletar(id : number) { 
    await this.buscarTodos();//Atualiza a lista de Usuário
    this.listaUsuarios.slice(id,1);//Remove o usuário do array
    await this.storageService.set('usuarios', this.listaUsuarios); //Salva o Array
  }

  async salvarId(id: number) { 
    await this.storageService.set('idUsuario',id);
  }

  // if pra quaando n tiver nenhum usuario retornar 0
  async buscarId() { 
    const id = await this.storageService.get('idUsuario');
    if (!id){ 
      return 0;    
    }
    return id;
  }

}
