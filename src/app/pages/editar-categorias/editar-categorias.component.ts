import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-categorias',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-categorias.component.html',
  styleUrl: './editar-categorias.component.css'
})
export class EditarCategoriasComponent implements OnInit {

  categoriasRenda: string[] = [];
  categoriasDespesa: string[] = [];
  listaCategorias: string[] = [];
  inputCategoria: string = '';
  rendaDespesa!: string;
  corBotao: boolean = true;

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.categoriasRenda = this.categoriasService.buscarCategoriasRenda();
    this.categoriasDespesa = this.categoriasService.buscarCategoriasDespesa();
    this.listaCategorias = this.categoriasRenda;
    this.rendaDespesa = 'renda';
    console.log(this.categoriasDespesa, this.categoriasRenda)
  }

  excluirCategoria(categoria: string) {
    this.categoriasService.excluirCategoria(this.rendaDespesa, categoria);
  }

  editarCategoria(categoria: string) {
    this.categoriasService.editarCategorias(this.rendaDespesa, categoria, this.inputCategoria);
    this.inputCategoria = '';
  }

  criarCategoria() {
    this.categoriasService.adicionarCategoria(this.rendaDespesa, this.inputCategoria);
    this.inputCategoria = '';
  }

  mudarRendaDespesa(rendaDespesa: string) {
    this.rendaDespesa = rendaDespesa;
    if(rendaDespesa === 'renda') {
      this.listaCategorias = this.categoriasRenda;
      this.corBotao = true;
    } else {
      this.listaCategorias = this.categoriasDespesa;
      this.corBotao = false;
    }
  }

}
