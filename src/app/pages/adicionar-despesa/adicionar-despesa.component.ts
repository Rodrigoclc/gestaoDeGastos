import { Component, OnInit } from '@angular/core';
import { TransacaoComponent } from '../../shared/components/transacao/transacao.component';
import { Projeto, Transacao } from '../../interfaces/iProjeto';
import { CreatePojectService } from '../../services/projetos.service';
import { CrudService } from '../../services/crud.service';
import { ITransacao, IUltimoProjeto } from '../../interfaces/IDbInterface';
import { ProjetoService } from '../../services/projeto.service';

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
  categoria: string = 'despesa';

  constructor(
    private projetoService: ProjetoService,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.getUltimoProjetoSelecionado();
  }

  getUltimoProjetoSelecionado():void {
    this.projetoService.getUltimoProjetoSelecionado().subscribe((data) => {
      data.forEach((item) => {
        let retornoProjetos: IUltimoProjeto = item as IUltimoProjeto;
        this.ultimoProjeto = retornoProjetos.ultimoProjeto;        
      });
    });
  }

  receberDados(dados: ITransacao) {
    dados.tipo = 'despesa';
    this.crudService.adicionarTransacao(dados);
  }
}
