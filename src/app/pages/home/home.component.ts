import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CreatePojectService } from '../../services/projetos.service';
import { Projeto, RetornoTransacao, Transacao } from '../../interfaces/iProjeto';
import { RouterLink } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component'
import { CategoriasService } from '../../services/categorias.service';
import { CommonModule } from '@angular/common';
import { EditarProjetosComponent } from '../../pages/editar-projetos/editar-projetos.component'
import { AuthService } from '../../services/auth.service';
import { RendaDespesaComponent } from '../../shared/components/renda-despesa/renda-despesa.component';
import { CrudService } from '../../services/crud.service';


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
  primeirosOptions!: string[];
  opcaoSelecionada!: string;
  despesaRenda: string = 'Despesa';
  saldoInicial!: number;
  renda!: number;
  despesa!: number;
  saldoFinal!: number;
  listaCategorias!: string[];
  detalhesPorCategoria: Transacao[] = [];
  listaProjetos!: Projeto[];
  teste: number = 100;
  corBotao: boolean = true;


  constructor(
    private createPojectService: CreatePojectService,
    private categoriasService: CategoriasService,
    private authService: AuthService,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {

    this.carregarProjetos(this.createPojectService.consultarProjetosLocalStorage())
    this.primeirosOptions = ((localStorage.getItem('projetosSelect'))?.slice(2, -2))!.split('","');
    this.opcaoSelecionada = this.createPojectService.buscarUltimoProjetoSelecionado();
    this.listaCategorias = this.categoriasService.buscarCategoriasRenda();
    this.mostrarResultados();
  }

  carregarProjetos(teste: boolean): void {
    if (teste === false) {
      this.listaProjetos = this.createPojectService.criarProjetosDefault();
    } else {
      this.listaProjetos = this.createPojectService.recuperarProjetos();
    }
  }

  salvarProjetoSelecionado() {
    localStorage.setItem('ultimoProjeto', this.opcaoSelecionada);
    this.mostrarResultados();
  }

  mostrarResultados() {
    const projeto = (this.listaProjetos.find(objeto => objeto.nome == this.opcaoSelecionada));
    this.saldoInicial = (projeto!.mostrarSaldoinicial());
    this.renda = (projeto!.mostrarTotalRenda());
    this.despesa = (projeto!.mostrarTotalDespesa());
    this.saldoFinal = (projeto!.calcularSaldoAtual());
    this.mostrarValoresPorCategoria('renda');
  }

  //resolver o problema desse if pra não repetir o codigo.
  mostrarValoresPorCategoria(rendaDespesa: string): void {

    const lista: RetornoTransacao[] = [];
    this.crudService.getAllRendas(rendaDespesa).snapshotChanges().subscribe((data) => {

      
      data.forEach((item) => {
        let transacao: object = item.payload.toJSON()!;
        let chave: string = item.key!
        let objeto = {
          chave: chave,
          transacao
        }
        lista.push(objeto);        
      });
      
    });
    console.log(lista);

    const projeto: Projeto = (this.listaProjetos.find(objeto => objeto.nome == this.opcaoSelecionada))!;
    const listaCategoriasAgrupadas: Transacao[] = [];
    if (rendaDespesa === 'renda') {
      this.corBotao = true;
      const categoriasAgrupadas = projeto['renda'].reduce((agrupado: any, item: any) => {
        const { categoria, valor } = item;
        if (!agrupado[categoria]) {
          agrupado[categoria] = { categoria, valor: 0 };
        }
        agrupado[categoria].valor += valor;
        return agrupado;
      }, {});

      for (let item in categoriasAgrupadas) {
        listaCategoriasAgrupadas.push(categoriasAgrupadas[item]);
      }
    } else {
      this.corBotao = false;
      const categoriasAgrupadas = projeto['despesa'].reduce((agrupado: any, item: any) => {
        const { categoria, valor } = item;
        if (!agrupado[categoria]) {
          agrupado[categoria] = { categoria, valor: 0 };
        }
        agrupado[categoria].valor += valor;
        return agrupado;
      }, {});

      for (let item in categoriasAgrupadas) {
        listaCategoriasAgrupadas.push(categoriasAgrupadas[item]);
      }
    }

    this.detalhesPorCategoria = listaCategoriasAgrupadas;

  }
}
