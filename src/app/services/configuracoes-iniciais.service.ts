import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ICategoria, IProjeto, IUltimoProjeto } from '../interfaces/IDbInterface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesIniciaisService {

  transacoesRef!: AngularFireList<any>
  categoriasDespesaDefault: ICategoria[] = [];
  categoriasRendaDefault: ICategoria[] = [];
  userUid!: string;

  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
    this.user();
  }

  // getAllTransacoes() {
  //   this.transacoesRef = this.db.list('transacoes');
  //   return this.transacoesRef;
  // }

  // getTransacao(dbPath: string, chave: string) {
  // this.transacoesRef = this.db.list(dbPath);
  //   return this.db.object(`${dbPath}/${chave}`);
  // }

  user()  {
    this.angularFireAuth.user.pipe(map((user) => {
      this.userUid = user!.uid;
    }))
  }

  adicionarProjetosDefault() {
    this.userUid = localStorage.getItem('userUid')!;
    this.transacoesRef = this.db.list(`projetos/${this.userUid.replace(/"/g, "")}`);
    console.log(`projetos/${this.userUid.replace(/"/g, "")}`);
    for (let index = 0; index < 3; index++) {
      const projetosDefault: IProjeto = {
        nomeProjeto: `Projeto ${index + 1}`,
        saldoInicial: 0,
        ativo: true
      }
      this.transacoesRef.push(projetosDefault);
    }
    this.adicionarCategoriasDefault();
  }

  adicionarUltimoProjeto() {
    this.transacoesRef = this.db.list(`ultimoProjeto/${this.userUid.replace(/"/g, "")}`);
    const ultimoProjeto: IUltimoProjeto = {
      ultimoProjeto: 'Projeto 1'
    }
    this.transacoesRef.push(ultimoProjeto);
  }


  adicionarCategoriasDefault() {
    this.transacoesRef = this.db.list(`projetos/${this.userUid.replace(/"/g, "")}`);

    const categoriasRenda: string[] = ['Salario', 'Comissão', 'Vendas'];
    const categoriasDespesa: string[] = ['Mercado', 'Restaurante', 'Contas'];

    let contador = 0;

    const categoriasRendaDefault: ICategoria[] = [];
    const categoriasDespesaDefault: ICategoria[] = [];

    this.transacoesRef.snapshotChanges().subscribe((data) => {
      data.forEach((item) => {
        let retornoProjetos: IProjeto = item.payload.toJSON()! as IProjeto;
        let chave: string = item.key!;
        console.log(chave);
        
        this.transacoesRef = this.db.list(`categorias/${this.userUid.replace(/"/g, "")}`);
        console.log(`categorias/${this.userUid.replace(/"/g, "")}`);
        
        console.log(this.userUid);

        const categoriaRendaDefault: ICategoria = {
          idProjeto: chave,
          nomeCategoria: categoriasRenda[contador],
          tipo: 'renda',
          ativo: true
        }

        const categoriaDespesaDefault: ICategoria = {
          idProjeto: chave,
          nomeCategoria: categoriasDespesa[contador],
          tipo: 'despesa',
          ativo: true
        }

        this.transacoesRef.push(categoriaDespesaDefault);
        this.transacoesRef.push(categoriaRendaDefault);
        contador++;
      });
    });
    this.adicionarUltimoProjeto();
  }


  // atualizarTransacao(dbPath: string, chave: string, transacao: Transacao) {
  // this.transacoesRef = this.db.list(dbPath);
  //   this.transacoesRef.update(chave, transacao);
  // }

  // deletarTransacao(dbPath: string, chave: string) {
  //   this.transacoesRef = this.db.list(dbPath);
  //   return this.transacoesRef.remove(chave);
  // }

  // insert(tipoTransacao: string, transacao: Transacao) {
  //   this.db.list(tipoTransacao).push(transacao)
  //     .then((result: any) => {
  //       console.log(result.key);
  //     });
  // }

  // getAll(tipoTransacao: PathReference) {
  //   return this.db.list(tipoTransacao)
  //     .snapshotChanges()
  //     .pipe(
  //       map(changes => {
  //         return changes.map(c => ({ key: c.payload.key, c.payload.val() }));
  //       })
  //     );
  // }
}
