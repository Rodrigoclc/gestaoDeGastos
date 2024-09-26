import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, PathReference } from '@angular/fire/compat/database';
import { Transacao } from '../interfaces/iProjeto';
import { map, Observable } from 'rxjs';
import { ITransacao } from '../interfaces/IDbInterface';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  transacoesRef!: AngularFireList<any>
  userUid!: string;
  transacoes!: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.userUid = localStorage.getItem('userUid')!;
  }

  getAllTransacoes() {
    this.transacoes = this.db.list(`transacoes/${this.userUid.replace(/"/g, "")}`).valueChanges() as Observable<any[]>;
    return this.transacoes;
  }

  // getTransacao(dbPath: string, chave: string) {
  // this.transacoesRef = this.db.list(dbPath);
  //   return this.db.object(`${dbPath}/${chave}`);
  // }

  adicionarTransacao(transacao: ITransacao) {
    this.transacoesRef = this.db.list(`transacoes/${this.userUid.replace(/"/g, "")}`);
    this.transacoesRef.push(transacao);
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
