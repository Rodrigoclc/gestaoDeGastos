import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ICategoria, IProjeto, IUltimoProjeto } from '../interfaces/IDbInterface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { ProjetoService } from './projeto.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesIniciaisService {

  transacoesRef!: AngularFireList<any>
  userUid!: string;

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
  ) {
    this.user();
  }

  user() {
    this.angularFireAuth.user.pipe(map((user) => {
      this.userUid = user!.uid;
    }))
  }

  adicionarProjetosDefault() {
    this.userUid = localStorage.getItem('userUid')!;
    this.transacoesRef = this.db.list(`projetos/${this.userUid.replace(/"/g, "")}`);
    
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

  adicionarCategoriasDefault() {
    this.transacoesRef = this.db.list(`projetos/${this.userUid.replace(/"/g, "")}`);

    const categoriasRenda: string[] = ['Salario', 'Comissão', 'Vendas'];
    const categoriasDespesa: string[] = ['Mercado', 'Restaurante', 'Contas'];

    let contador = 0;

    this.transacoesRef.snapshotChanges().subscribe((data) => {
      data.forEach((item) => {
        let retornoProjetos: IProjeto = item.payload.toJSON()! as IProjeto;
        let chave: string = item.key!;

        this.transacoesRef = this.db.list(`categorias/${this.userUid.replace(/"/g, "")}`);
        
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
        if (retornoProjetos.nomeProjeto == 'Projeto 1') {
          this.transacoesRef = this.db.list(`ultimoProjeto/${this.userUid.replace(/"/g, "")}`);
          const ultimoProjeto: IUltimoProjeto = {
            idProjeto: chave,
            ultimoProjeto: 'Projeto 1',            
          }
          this.transacoesRef.push(ultimoProjeto);
        }
        contador++;
      });
    });
  }
}
