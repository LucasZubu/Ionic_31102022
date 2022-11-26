import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario.model';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  listaUsuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService,private route: Router ) { }

  async buscarUsuarios(){
    //retornando variaves e consultas de outras paginas
    this.listaUsuarios = await this.usuariosService.buscarTodos();
  }

  async cadastroPage(){
      this.route.navigateByUrl('/cadastro');
  }

  ngOnInit(): void {
    
  }

  ionViewWillEnter(){
    this.buscarUsuarios();
  }

}
