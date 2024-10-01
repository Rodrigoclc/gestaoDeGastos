import { Component, OnInit } from '@angular/core';
import { TransacaoComponent } from '../../shared/components/transacao/transacao.component';
import { Projeto, Transacao } from '../../interfaces/iProjeto';
import { CrudService } from '../../services/crud.service';
import { ITransacao, IUltimoProjeto, UltimoProjeto } from '../../interfaces/IDbInterface';
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
  ultimoProjeto!: UltimoProjeto;
  categoria: string = 'despesa';

  constructor(
    private projetoService: ProjetoService,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.getUltimoProjetoSelecionado();
  }

  getUltimoProjetoSelecionado():void {
    this.projetoService.getUltimoProjetoSelecionado().snapshotChanges().subscribe((data) => {
      data.forEach((item) => {
        let retornoUltimoProjeto: IUltimoProjeto = item.payload.toJSON() as IUltimoProjeto;
        let chave: string = item.key!;
        const ultimoProjeto: UltimoProjeto = {
          idUltimoProjeto: chave,
          ultimoProjeto: retornoUltimoProjeto
        }
        this.ultimoProjeto = ultimoProjeto;
      });
    });
  }

  receberDados(dados: ITransacao) {
    dados.idProjeto = this.ultimoProjeto.ultimoProjeto.idProjeto;
    dados.tipo = 'despesa';
    this.crudService.adicionarTransacao(dados);
  }
}
