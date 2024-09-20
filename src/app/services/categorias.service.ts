import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categoriasRenda!: string[];
  categoriasDespesa!: string[];

  constructor() { }

  consultarCategoriRendaLocalStorage(): boolean {
    if(!localStorage.getItem('categoriasRenda')) {
      return false;
    } else {
      return true;
    }
  }

  consultarCategoriDespesaLocalStorage(): boolean {
    if(!localStorage.getItem('categoriasDespesa')) {
      return false;
    } else {
      return true;
    }
  }

  buscarCategoriasRenda(): string[] {
    if(!localStorage.getItem('categoriasRenda')) {
      const categorias: string[] = ['Salario', 'Comissão', 'Vendas'];
      this.categoriasRenda = categorias;
      localStorage.setItem('categoriasRenda', JSON.stringify(this.categoriasRenda));
      return categorias;
    } else {
      const categorias: string[] = JSON.parse(localStorage.getItem('categoriasRenda')!);
      this.categoriasRenda = categorias;
      return this.categoriasRenda;
    }
  }

  buscarCategoriasDespesa(): string[] {
    if(!localStorage.getItem('categoriasDespesa')) {
      const categorias: string[] = ['Mercado', 'Restaurante', 'Contas'];
      this.categoriasDespesa = categorias;
      localStorage.setItem('categoriasDespesa', JSON.stringify(this.categoriasDespesa));
      return categorias;
    } else {
      const categorias: string[] = JSON.parse(localStorage.getItem('categoriasDespesa')!);
      this.categoriasDespesa = categorias;
      return this.categoriasDespesa;
    }
  }

  editarCategorias(rendaOuDespesa: string, categoriaAEditar: string, novaCategoria: string): void {
    if(rendaOuDespesa === 'renda') {
      const index: number = this.categoriasRenda.findIndex(i => i === categoriaAEditar);
      this.categoriasRenda[index] = novaCategoria;
      localStorage.setItem('categoriasRenda', JSON.stringify(this.categoriasRenda));
    } else {
      const index: number = this.categoriasDespesa.findIndex(i => i === categoriaAEditar);
      this.categoriasDespesa[index] = novaCategoria;
      localStorage.setItem('categoriasDespesa', JSON.stringify(this.categoriasDespesa));
    }
  }

  adicionarCategoria(rendaDespesa: string, novaCategoria: string): void {
    if(rendaDespesa === 'renda') {
      this.categoriasRenda.push(novaCategoria);      
      localStorage.setItem('categoriasRenda', JSON.stringify(this.categoriasRenda));
    } else {
      this.categoriasDespesa.push(novaCategoria);
      localStorage.setItem('categoriasDespesa', JSON.stringify(this.categoriasDespesa));
    }
  }

  excluirCategoria(categoria: string, nomeCategoria: string) {
    if(categoria === 'renda') {      
      const index: number = this.categoriasRenda.findIndex(i => i === nomeCategoria);
      this.categoriasRenda.splice(index, 1);
      localStorage.setItem('categoriasRenda', JSON.stringify(this.categoriasRenda));
    } else {
      const index: number = this.categoriasDespesa.findIndex(i => i === nomeCategoria);
      this.categoriasDespesa.splice(index, 1);
      localStorage.setItem('categoriasDespesa', JSON.stringify(this.categoriasDespesa)); 
    }
  }
}
