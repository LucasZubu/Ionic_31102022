/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Variavel Storage responsavel por armazenar regsitros no banco
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Função init pede para criar o banco de dados
    const storage = await this.storage.create();
    this._storage = storage;
  }

  
  // Função set grava os dados no banco
  public async set(key: string, value: any) {
   await this._storage?.set(key, value);
  }

  public async get(key: string){
   return  await this._storage?.get(key)
  }

  public async delete(key:string){
    await this._storage.remove(key);
  }
}
