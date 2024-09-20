export class Transacao {
    valor: number;
    categoria: string;
    descricao: string;
    data: string;
    hora: string;

    constructor(valor: number, categoria: string, descricao: string, data: string, hora: string) {
      this.valor = valor;
      this.categoria = categoria;
      this.descricao = descricao;
      this.data = data;
      this.hora = hora;
    }
  }
  
  export class Projeto {
    nome: string;
    saldoInicial: number;
    renda: Transacao[];
    despesa: Transacao[];
  
    constructor(nome: string, saldoInicial: number, renda: Transacao[], despesa: Transacao[]) {
      this.nome = nome;
      this.saldoInicial = saldoInicial;
      this.renda = renda;
      this.despesa = despesa;
    }

    static criarApartirdaLocalStorage(dado: any): Projeto {
      const projeto = new Projeto(dado.nome, dado.saldoInicial, dado.renda, dado.despesa)
      return projeto;
    }
  
    mostrarSaldoinicial(): number {
      return this.saldoInicial;
    }
  
    mostrarTotalRenda(): number {
      return this.renda.reduce((total, transacao) => total + transacao.valor, 0);
    }
  
    mostrarTotalDespesa(): number {
      return this.despesa.reduce((total, transacao) => total + transacao.valor, 0);
    }
  
    calcularSaldoAtual(): number {
      const totalRenda = this.mostrarTotalRenda();
      const totalDespesa = this.mostrarTotalDespesa();
      return this.saldoInicial + totalRenda - totalDespesa;
    }

    adicionarRenda(novaRenda: Transacao): void {
      this.renda.push(novaRenda);
    }

    adicionarDespesa(novaDespesa: Transacao): void {
      this.despesa.push(novaDespesa);
    }

    alterarSaldoInicial(novoSaldoInicial: number): void {
      this.saldoInicial = novoSaldoInicial;
    }

    mostrarTransacoes(): Transacao[] {
      const transacoes: Transacao[] = [];
      return this.renda, this.despesa;
    }
  }

  export interface UserLogin {
    email: string,
    senha: string
  } 

  export interface RetornoTransacao {
    chave: string,
    transacao: object
  }
  