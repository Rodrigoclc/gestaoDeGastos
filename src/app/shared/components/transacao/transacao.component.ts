import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Transacao } from '../../../interfaces/iProjeto';
import { RouterLink } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { ICategoria, ITransacao } from '../../../interfaces/IDbInterface';

@Component({
  selector: 'app-transacao',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './transacao.component.html',
  styleUrl: './transacao.component.css'
})
export class TransacaoComponent implements OnInit {

  @Output() dadosEnviados = new EventEmitter<ITransacao>();

  transacoes!: FormGroup;
  select!: string;
  categorias: string[] = [];

  @Input()titulo: string = '';
  @Input()categoria!: string;

  constructor(private formBuilder: FormBuilder, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.transacoes = this.formBuilder.group({
      valor: ['',[Validators.required]],
      categoria: ['',[Validators.required]],
      descricao: ['',[Validators.required]],
      data: [this.obterDataAtualFormatada(),[Validators.required]],
      hora: [this.obterHoraAtual(),[Validators.required]]
    })
    this.obterCategorias();
  }

  obterCategorias() {
    this.categoriaService.getAllCategorias(this.categoria).subscribe((data) => {
      data.forEach((item) => {
        let retornoCategorias: ICategoria = item as ICategoria;
        //let chave: string = item.key!;
        this.categorias.push(retornoCategorias.nomeCategoria);
      });
    });
  }

   private obterHoraAtual(): string {
    const agora = new Date();
    const hora = agora.getHours()
    const minutos = agora.getMinutes()
    return `${hora}:${minutos}`;
  }

  private obterDataAtualFormatada(): string {
    const agora: Date = new Date()
    const ano: number = agora.getFullYear();
    const mes: string = this.formatarData(agora.getMonth() + 1);
    const dia: string = this.formatarData(agora.getDate());
    return `${ano}-${mes}-${dia}`;
  }

  private formatarData(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }

  subimtForm() {
    this.dadosEnviados.emit(this.transacoes.value as ITransacao);
    this.transacoes.patchValue({valor: '', descricao: ''});
  }
}
