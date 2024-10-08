export interface ITransacao {
    idProjeto: string;
    categoria: string;
    data: string;
    descricao: string;
    hora: string;
    tipo: string;
    valor: number;
    ativo: boolean;
}

export interface ICategoria {
    idProjeto: string;
    nomeCategoria: string;
    tipo: string;
    ativo: boolean;
}

export interface IProjeto {
    nomeProjeto: string;
    saldoInicial: number;
    ativo: boolean;
}

export interface Projeto {
    idProjeto: string,
    nomeProjeto: string;
    saldoInicial: number;
    ativo: boolean;
}

export interface IUsuario {
    nomeUsuario: string;
    fotoUsuario: string;
}

export interface IUltimoProjeto {
    idProjeto: string,
    ultimoProjeto: string
}

export interface UltimoProjeto {
    idUltimoProjeto: string;
    ultimoProjeto: IUltimoProjeto
}
