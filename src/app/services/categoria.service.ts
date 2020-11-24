import { Injectable } from '@angular/core';
import { Categoria } from './../models/Categoria';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public url = 'http://localhost:8080/categorias/';

  constructor(private http: HttpClient) { }

  public listar() {
    return this.http.get(this.url);
  }

  public buscarPorId(id: number) {
    return this.http.get(this.url + id);

  }
  public salvar(categoria: Categoria) {
    return this.http.post(this.url, categoria.id, categoria);

  }
  public alterar(categoria: Categoria) {
    return this.http.put(this.url + categoria.id, categoria);
  }
  
  public deletar(id: number) {
    return this.http.delete(this.url + id);
  }

}
