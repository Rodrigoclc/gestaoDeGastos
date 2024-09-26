import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasRef!: AngularFireList<any>
  userUid!: string;
  categorias!: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.userUid = localStorage.getItem('userUid')!;
  }


  getAllCategorias(tipo: string) {    
    this.categorias = this.db.list(`categorias/${this.userUid.replace(/"/g, "")}`, ref => ref.orderByChild('tipo').equalTo(tipo)).valueChanges() as Observable<any[]>;
    return this.categorias;
  }

  // getTransacao(dbPath: string, chave: string) {
  // this.categoriasRef = this.db.list(dbPath);
  //   return this.db.object(`${dbPath}/${chave}`);
  // }

  // adicionarTransacao(dbPath: string, transacao: Transacao) {
  // this.categoriasRef = this.db.list(dbPath);
  //   this.categoriasRef.push(transacao);
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
