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
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
        path: '', component: MainComponent,
        children: [
            { path: '', component: HomeComponent, canActivate: [authGuard] },
            { path: '', component: AdicionarDespesaComponent, canActivate: [authGuard] }
        ]
    },
    { path: 'adicionar-despesa', component: AdicionarDespesaComponent, canActivate: [authGuard] },
    { path: 'adicionar-renda', component: AdicionarRendaComponent, canActivate: [authGuard] },
    { path: 'editar-cateforias', component: EditarCategoriasComponent, canActivate: [authGuard] },
    { path: 'editar-projetos', component: EditarProjetosComponent, canActivate: [authGuard] }
];
