import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { IProjeto, IUltimoProjeto } from '../interfaces/IDbInterface';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  projetosRef!: AngularFireList<any>

  constructor(private db: AngularFireDatabase) {}

  getAllProjetos() {
    this.projetosRef = this.db.list('projetos');
    return this.projetosRef;
  }

  getUltimoProjetoSelecionado() {
    this.projetosRef = this.db.list('ultimoProjeto');
    return this.projetosRef;
  }

  atualizarRegistroDoUltomoProjetoSelecionado(chave: string, ultimoProjeto: IUltimoProjeto) {
    console.log(ultimoProjeto);
  this.projetosRef = this.db.list('ultimoProjeto');
    this.projetosRef.update(chave, ultimoProjeto);
  }

  // getTransacao(dbPath: string, chave: string) {
  // this.transacoesRef = this.db.list(dbPath);
  //   return this.db.object(`${dbPath}/${chave}`);
  // }

  // adicionarTransacao(dbPath: string, transacao: IProjeto) {
  // this.projetosRef = this.db.list(dbPath);
  //   this.projetosRef.push(transacao);
  // }

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
