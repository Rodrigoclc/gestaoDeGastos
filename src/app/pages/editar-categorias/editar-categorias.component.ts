import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';

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

  listaCategorias: string[] = [];
  inputCategoria: string = '';
  rendaDespesa!: string;
  corBotao: boolean = true;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.rendaDespesa = 'renda';
    this.listaCategorias = this.buscarCategoriasRenda(this.rendaDespesa);
    console.log(this.listaCategorias);
  }

  buscarCategoriasRenda(rendaDespesa: string): string[] {
    const categorias: string[] = [];
    this.categoriaService.getAllCategorias(rendaDespesa).subscribe((data) => {
      data.forEach((item) => {
        categorias.push(item.nomeCategoria);
      })
    })
    return categorias;
  }

  excluirCategoria(categoria: string) {
    // this.categoriasService.excluirCategoria(this.rendaDespesa, categoria);
  }

  editarCategoria(categoria: string) {
    // this.categoriasService.editarCategorias(this.rendaDespesa, categoria, this.inputCategoria);
    // this.inputCategoria = '';
  }

  criarCategoria() {
    // this.categoriasService.adicionarCategoria(this.rendaDespesa, this.inputCategoria);
    // this.inputCategoria = '';
  }

  mudarRendaDespesa(rendaDespesa: string) {
    this.rendaDespesa = rendaDespesa;
    this.listaCategorias = this.buscarCategoriasRenda(this.rendaDespesa);
    if(rendaDespesa === 'renda') {
      this.corBotao = true;
    } else {
      this.corBotao = false;
    }
  }

}
