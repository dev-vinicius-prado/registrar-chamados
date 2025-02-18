import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
  standalone: true,
})
export class TopMenuComponent {
  activeMenu: string = 'dashboard'; // Menu ativo

  constructor(private router: Router) {}

  navigateTo(menu: string) {
    this.activeMenu = menu;
    this.router.navigate([menu]);
  }
}
