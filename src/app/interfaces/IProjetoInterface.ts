import { ITransacao } from './ITransacaoInterface'

export interface IProjeto {
    nome: string;
    saldoInicial: number;
    renda: ITransacao[];
    despesa: ITransacao[];
}