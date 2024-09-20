import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { TransacaoComponent } from './shared/components/transacao/transacao.component';
import { AdicionarDespesaComponent } from './pages/adicionar-despesa/adicionar-despesa.component';
import { AdicionarRendaComponent } from './pages/adicionar-renda/adicionar-renda.component';
import { EditarCategoriasComponent } from './pages/editar-categorias/editar-categorias.component';
import { EditarProjetosComponent } from './pages/editar-projetos/editar-projetos.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
        path: '', component: MainComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: '', component: AdicionarDespesaComponent }
        ]
    },
    { path: 'adicionar-despesa', component: AdicionarDespesaComponent },
    { path: 'adicionar-renda', component: AdicionarRendaComponent},
    { path: 'editar-cateforias', component: EditarCategoriasComponent },
    { path: 'editar-projetos', component: EditarProjetosComponent }
];
