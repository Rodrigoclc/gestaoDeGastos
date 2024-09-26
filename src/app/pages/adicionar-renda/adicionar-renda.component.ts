import { Component } from '@angular/core';
import { TransacaoComponent } from '../../shared/components/transacao/transacao.component';
import { Projeto, Transacao } from '../../interfaces/iProjeto';
import { CrudService } from '../../services/crud.service';
import { ProjetoService } from '../../services/projeto.service';
import { ITransacao, IUltimoProjeto } from '../../interfaces/IDbInterface';

@Component({
  selector: 'app-adicionar-renda',
  standalone: true,
  imports: [
    TransacaoComponent
  ],
  templateUrl: './adicionar-renda.component.html',
  styleUrl: './adicionar-renda.component.css'
})
export class AdicionarRendaComponent {

  listaProjetos!: Projeto[];
  ultimoProjeto!: string;
  Categoria: string = 'renda';

  tituloHeader: string = 'Adicionar renda';

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
    dados.tipo = 'renda';
    this.crudService.adicionarTransacao(dados);
  }

}
