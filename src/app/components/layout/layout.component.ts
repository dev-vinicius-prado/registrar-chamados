import { Component } from '@angular/core';
import { BottomNavigatorComponent } from '../bottom-navigator/bottom-navigator.component';
import { TopMenuComponent } from "../top-menu/top-menu.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: true,
  imports: [BottomNavigatorComponent, TopMenuComponent], // Importe outros componentes se necessário
})
export class LayoutComponent {}
