import { Component } from '@angular/core';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from '../pages/home/home.component';
import { ConfiguracoesComponent } from '../pages/configuracoes/configuracoes.component'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    MaterialModule,
    HomeComponent,
    ConfiguracoesComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
