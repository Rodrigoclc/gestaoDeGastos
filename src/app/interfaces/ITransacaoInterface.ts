export interface ITransacao {
    id?: string;
    tipo: string;
    valor: number;
    categoria: string;
    descricao: string;
    data: string;
    hora: string;
}