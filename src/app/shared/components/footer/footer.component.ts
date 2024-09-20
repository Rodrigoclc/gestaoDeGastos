import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

}
