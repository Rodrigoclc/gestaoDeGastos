export interface ITransacao {
    idTransacao: string;
    idProjeto: string;
    idUsuario: string;
    categoria: string;
    data: string;
    descricao: string;
    hora: string;
    tipo: string;
    valor: number;
    ativo: boolean;
}

export interface ICategoria {
    idCategoria: string;
    idProjeto: string;
    idUsuario: string;
    nomeCategoria: string;
    tipo: string;
    ativo: boolean;
}

export interface IProjeto {
    idProjeto: string;
    idUsuario: string;
    nomeProjeto: string;
    saldoInicial: number;
    ativo: boolean;
}

export interface IUsuario {
    idUsuario: string;
    nomeUsuario: string;
    fotoUsuario: string;
}

export interface IUltimoProjeto {
    idUltimoProjeto:string
    idUsuario: string
    ultimoProjeto: string
}
