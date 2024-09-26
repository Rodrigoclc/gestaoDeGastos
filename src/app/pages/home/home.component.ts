import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Projeto, RetornoTransacao, Transacao } from '../../interfaces/iProjeto';
import { ITransacao } from '../../interfaces/ITransacaoInterface'
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component'
import { CommonModule } from '@angular/common';
import { EditarProjetosComponent } from '../../pages/editar-projetos/editar-projetos.component'
import { AuthService } from '../../services/auth.service';
import { RendaDespesaComponent } from '../../shared/components/renda-despesa/renda-despesa.component';
import { CrudService } from '../../services/crud.service';
import { ProjetoService } from '../../services/projeto.service';
import { IProjeto, IUltimoProjeto, UltimoProjeto } from '../../interfaces/IDbInterface';
import { ConfiguracoesIniciaisService } from '../../services/configuracoes-iniciais.service';


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
    RendaDespesaComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  primeirosOptions!: IProjeto[];
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
  ultimoProjetoSelecionado!: UltimoProjeto;
  selectForm: FormGroup = new FormGroup({
    meuSelect: new FormControl(''),
  });;

  constructor(
    private crudService: CrudService,
    private projetoService: ProjetoService,
    private configuracoesIniciaisService: ConfiguracoesIniciaisService,
  ) { }

  projetosDefault(): void {
    this.configuracoesIniciaisService.adicionarProjetosDefault();
  }

  ngOnInit(): void {
    this.obterNomesDosProjetos();
    this.obterTransacoesRendaOuDespesa();
  }

  obterUltimoProjetoSelecionado() {

    this.projetoService.getUltimoProjetoSelecionado().subscribe((data) => {
      data.forEach((item) => {
        let retornoProjetos: IUltimoProjeto = item as IUltimoProjeto;
        let chave: string = item.key!;
        const ultimoProjeto: UltimoProjeto = {
          idUsuario: chave,
          ultimoProjeto: retornoProjetos
        }

        this.ultimoProjetoSelecionado = ultimoProjeto;
        this.selectForm.get('meuSelect')!.setValue(retornoProjetos.ultimoProjeto)
      });
    });
  }

  obterNomesDosProjetos() {
    let listaOptions: IProjeto[] = [];
    this.projetoService.getAllProjetos().subscribe((data) => {
      data.forEach((item) => {
        let retornoProjetos: IProjeto = item as IProjeto;
        let chave: string = item.key!;

        listaOptions.push(retornoProjetos);

      });
    });

    this.primeirosOptions = listaOptions;
  }

  salvarProjetoSelecionado() {
    this.selectForm.get('meuSelect')!.valueChanges.subscribe((valorSelecionado) => {
      this.ultimoProjetoSelecionado.ultimoProjeto.ultimoProjeto = valorSelecionado;
      this.projetoService.atualizarRegistroDoUltomoProjetoSelecionado(this.ultimoProjetoSelecionado.idUsuario, this.ultimoProjetoSelecionado.ultimoProjeto);
    });
  }

  mostrarValoresPorCategoria(rendaDespesa: string) {
    this.corBotao = rendaDespesa == 'renda' ? true : false;
    let categoriasAgrupadas = {
      categoria: '',
      valor: 0
    }
    let listaCategoriasAgrupadas: any[] = [];
    for (let transacao of this.listaTransacoes) {
      if (transacao.tipo == rendaDespesa) {
        categoriasAgrupadas.categoria = transacao.categoria;
        categoriasAgrupadas.valor = transacao.valor;
        listaCategoriasAgrupadas.push(categoriasAgrupadas);
      }
    };

    this.detalhesPorCategoria = listaCategoriasAgrupadas
  }

  obterTransacoesRendaOuDespesa(): void {

    this.obterUltimoProjetoSelecionado();
    const transacao: ITransacao = {
      tipo: '',
      valor: 0,
      categoria: '',
      descricao: '',
      data: '',
      hora: ''
    }
    const lista: ITransacao[] = [];
    this.crudService.getAllTransacoes().subscribe((data) => {

      data.forEach((item) => {

        let transacoes: ITransacao = item as ITransacao;
        let chave: string = item.key!

        transacao.id = chave,
          transacao.valor = transacoes.valor,
          transacao.categoria = transacoes.categoria,
          transacao.descricao = transacoes.descricao,
          transacao.data = transacoes.data,
          transacao.hora = transacoes.hora,
          transacao.tipo = transacoes.tipo
        lista.push(transacoes);

      });
    });
    this.listaTransacoes = lista;
    let despesas = 0;
    let rendas = 0;
    console.log(this.listaTransacoes);
    for(let item of this.listaTransacoes) {
      console.log(item);
    }
    this.listaTransacoes.forEach((item) => {
      console.log(item);
      if (item.tipo == 'renda') {
        rendas += item.valor;
        console.log("renda:",item);
      } else {
        console.log("despesa",item);
        despesas += item.valor;
      }
    });

    this.renda = rendas;
    this.despesa = despesas;
    this.saldoFinal = this.renda - this.despesa;
    this.selectForm.get('meuSelect')!.valueChanges.subscribe((valorSelecionado) => {
      this.saldoInicial = (this.primeirosOptions.find((x) => x.nomeProjeto == valorSelecionado)!.saldoInicial);
    });
  }
}
