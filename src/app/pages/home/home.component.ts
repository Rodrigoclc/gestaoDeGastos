import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Projeto, RetornoTransacao, Transacao } from '../../interfaces/iProjeto';
import { ITransacao } from '../../interfaces/ITransacaoInterface'
import { RouterLink } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component'
import { CommonModule } from '@angular/common';
import { EditarProjetosComponent } from '../../pages/editar-projetos/editar-projetos.component'
import { AuthService } from '../../services/auth.service';
import { RendaDespesaComponent } from '../../shared/components/renda-despesa/renda-despesa.component';
import { CrudService } from '../../services/crud.service';
import { ProjetoService } from '../../services/projeto.service';
import { IProjeto, IUltimoProjeto } from '../../interfaces/IDbInterface';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink,
    FormsModule,
    HeaderComponent,
    CommonModule,
    EditarProjetosComponent,
    RendaDespesaComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  primeirosOptions!: IProjeto[];
  opcaoSelecionada!: string;
  despesaRenda: string = 'Despesa';
  saldoInicial!: number;
  renda!: number;
  despesa!: number;
  saldoFinal!: number;
  listaCategorias!: string[];
  detalhesPorCategoria: Transacao[] = [];
  listaTransacoes!: ITransacao[];
  teste: number = 100;
  corBotao: boolean = true;
  ultimoProjetoSelecionado!: IUltimoProjeto;

  constructor(
    private crudService: CrudService,
    private projetoService: ProjetoService
  ) { }

  ngOnInit(): void {
    this.obterUltimoProjetoSelecionado();
    this.primeirosOptions = this.obterNomesDosProjetos();
    this.obterTransacoesRendaOuDespesa();
  }

  obterUltimoProjetoSelecionado() {
    this.projetoService.getUltimoProjetoSelecionado().snapshotChanges().subscribe((data) => {
      data.forEach((item) => {
        let retornoProjetos: IUltimoProjeto = item.payload.toJSON()! as IUltimoProjeto;
        let chave: string = item.key!;
        let objeto: IUltimoProjeto = {
          idUltimoProjeto: chave,
          idUsuario: retornoProjetos.idUsuario,
          ultimoProjeto: retornoProjetos.ultimoProjeto
        }
        this.ultimoProjetoSelecionado = objeto;
        this.opcaoSelecionada = objeto.ultimoProjeto;
      });
    });
  }

  obterNomesDosProjetos(): IProjeto[] {
    let listaOptions: IProjeto[] = [];
    this.projetoService.getAllProjetos().snapshotChanges().subscribe((data) => {
      data.forEach((item) => {
        let retornoProjetos: IProjeto = item.payload.toJSON()! as IProjeto;
        let chave: string = item.key!;

        let objeto: IProjeto = {
          idProjeto: chave,
          idUsuario: retornoProjetos.idUsuario,
          nomeProjeto: retornoProjetos.nomeProjeto,
          saldoInicial: retornoProjetos.saldoInicial,
          ativo: retornoProjetos.ativo
        }
        listaOptions.push(objeto);
        
      });
    });

    return listaOptions;
  }

  salvarProjetoSelecionado() {
    this.ultimoProjetoSelecionado.ultimoProjeto = this.opcaoSelecionada;
    this.projetoService.atualizarRegistroDoUltomoProjetoSelecionado(this.ultimoProjetoSelecionado.idUltimoProjeto, this.ultimoProjetoSelecionado);
  }

  mostrarValoresPorCategoria(rendaDespesa: string) {
    this.corBotao = rendaDespesa == 'renda'? true : false;
    let categoriasAgrupadas = {
      categoria: '',
      valor: 0
    }
    let listaCategoriasAgrupadas: any[] = [];
    for(let transacao of this.listaTransacoes) {
      if (transacao.tipo == rendaDespesa) {
        categoriasAgrupadas.categoria = transacao.categoria;
        categoriasAgrupadas.valor = transacao.valor;
        listaCategoriasAgrupadas.push(categoriasAgrupadas);
      }
    };
    this.detalhesPorCategoria = listaCategoriasAgrupadas
  }

  obterTransacoesRendaOuDespesa(): void {

    const lista: ITransacao[] = [];
    this.crudService.getAllTransacoes().snapshotChanges().subscribe((data) => {
      
      data.forEach((item) => {

        let transacoes: ITransacao = item.payload.toJSON()! as ITransacao;
        let chave: string = item.key!

        let transacao: ITransacao = {
          id: chave,
          valor: transacoes.valor,
          categoria: transacoes.categoria,
          descricao: transacoes.descricao,
          data: transacoes.data,
          hora: transacoes.hora,
          tipo: transacoes.tipo
        }

        lista.push(transacao);

      });

      this.listaTransacoes = lista;

      let despesas = 0;
      let rendas = 0;
  
      this.listaTransacoes.forEach((item) => {
        if(item.tipo == 'renda') {
          rendas += item.valor;
        } else {
          despesas += item.valor;
        }
      });
      
      this.renda = rendas;
      this.despesa = despesas;
      this.saldoFinal = this.renda - this.despesa;
      this.saldoInicial = (this.primeirosOptions.find((x) => x.nomeProjeto == this.opcaoSelecionada)!.saldoInicial); //calcula o saldo inicial
    });
  }
}
