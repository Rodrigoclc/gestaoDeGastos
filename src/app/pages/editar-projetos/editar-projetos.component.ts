import { Component, } from '@angular/core';
import { Projeto } from '../../interfaces/iProjeto';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterLink } from '@angular/router';
import { ProjetoService } from '../../services/projeto.service';
import { IProjeto } from '../../interfaces/IDbInterface';

@Component({
  selector: 'app-editar-projetos',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: './editar-projetos.component.html',
  styleUrl: './editar-projetos.component.css'
})
export class EditarProjetosComponent {
  listaProjetos!: IProjeto[];
  novoProjeto!: string;
  saldoInicialProjeto!: number;
  projetoSelecionado!: Projeto;

  constructor(
    private projetoService: ProjetoService,
  ) { }

  ngOnInit(): void {
    this.listaProjetos = this.recuperarProjetos();
    console.log(this.listaProjetos);
  }

  recuperarProjetos(): IProjeto[] {
    const listaProjetos: IProjeto[] = [];
    this.projetoService.getAllProjetos().subscribe((data) => {
      data.forEach((item) => {
        listaProjetos.push(item);
      })
      
    });
    return listaProjetos;
  }

  selecionar(): void {
  //   localStorage.setItem('ultimoProjeto', this.projetoSelecionado.nome);
  }

  excluir(index: number): void {
  //   this.projetosSevices.excluirProjeto(this.listaProjetos[index].nome);
  //   this.listaProjetos = this.projetosSevices.recuperarProjetos();
  }

  criarProjeto(): void {
  //   if(!this.saldoInicialProjeto) this.saldoInicialProjeto = 0;
  //   this.projetosSevices.criarNovosProjetos(this.novoProjeto, this.saldoInicialProjeto);
  //   this.listaProjetos = this.projetosSevices.recuperarProjetos();
  }

  chamarColapso(index: number, criarEditar: boolean): void {
    if(criarEditar) {
      this.novoProjeto = this.listaProjetos[index].nomeProjeto;
      this.saldoInicialProjeto = this.listaProjetos[index].saldoInicial;
    } else {
      this.novoProjeto = '';
      this.saldoInicialProjeto = 0;
    }
    
  }

  atualizarProjeto(index: number): void {
  //   if(!this.saldoInicialProjeto) this.saldoInicialProjeto = 0;
  //   this.projetosSevices.atualizarProjeto(this.listaProjetos[index].nome, this.novoProjeto, this.saldoInicialProjeto);
  //   this.listaProjetos = this.projetosSevices.recuperarProjetos();
  }

  // criarNovoProjetoOuAtualizar(atualizarEditar: string): void {
  //   if(atualizarEditar === 'Novo projeto') {
  //     if(!this.novoProjeto.value.saldoInicial) this.novoProjeto.value.saldoInicial = 0;
  //     this.projetosSevices.criarNovosProjetos(this.novoProjeto.value.nomeProjeto, this.novoProjeto.value.saldoInicial);
  //     this.novoProjeto.reset();
  //   } else {
  //     if(!this.novoProjeto.value.saldoInicial) this.novoProjeto.value.saldoInicial = 0;
  //     this.projetosSevices.atualizarProjeto(this.projetoSelecionado.nome, this.novoProjeto.value.nomeProjeto, this.novoProjeto.value.saldoInicial);
  //     this.novoProjeto.reset();
  //   }   
  // }
}
