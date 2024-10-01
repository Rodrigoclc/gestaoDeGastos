import { Component } from '@angular/core';
import { TransacaoComponent } from '../../shared/components/transacao/transacao.component';
import { Projeto, Transacao } from '../../interfaces/iProjeto';
import { CrudService } from '../../services/crud.service';
import { ProjetoService } from '../../services/projeto.service';
import { ITransacao, IUltimoProjeto, UltimoProjeto } from '../../interfaces/IDbInterface';

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
  ultimoProjeto!: UltimoProjeto;
  Categoria: string = 'renda';
  idProjeto!: string;
  tituloHeader: string = 'Adicionar renda';

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
        console.log('ultimo',ultimoProjeto);
        this.ultimoProjeto = ultimoProjeto;
      });
    });
  }

  receberDados(dados: ITransacao) {
    //dados.idProjeto = this.ultimoProjeto
    dados.tipo = 'renda';
    this.crudService.adicionarTransacao(dados);
  }

}
