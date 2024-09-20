import { Component, OnInit } from '@angular/core';
import { TransacaoComponent } from '../../shared/components/transacao/transacao.component';
import { Projeto, Transacao } from '../../interfaces/iProjeto';
import { CreatePojectService } from '../../services/projetos.service';
import { CategoriasService } from '../../services/categorias.service';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-adicionar-despesa',
  standalone: true,
  imports: [
    TransacaoComponent
  ],
  templateUrl: './adicionar-despesa.component.html',
  styleUrl: './adicionar-despesa.component.css'
})
export class AdicionarDespesaComponent implements OnInit {

  tituloHeader: string = 'Adicionar despesa'

  listaProjetos!: Projeto[];
  ultimoProjeto!: string;
  listaCategorias!: string[];

  constructor(
    private projetosService: CreatePojectService, 
    private categorias: CategoriasService,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.ultimoProjeto = this.projetosService.buscarUltimoProjetoSelecionado();
    this.listaProjetos = this.projetosService.recuperarProjetos();
    this.listaCategorias = this.categorias.buscarCategoriasDespesa();
  }

  receberDados(dados: Transacao) {
    this.crudService.adicionarTransacao('despesa', dados);

    // this.listaProjetos.find(objeto => objeto.nome == this.ultimoProjeto)!.adicionarDespesa(dados);
    // localStorage.setItem('projetos', JSON.stringify(this.listaProjetos));
  }
}
