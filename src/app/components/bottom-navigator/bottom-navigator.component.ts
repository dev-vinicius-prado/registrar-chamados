import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-navigator',
  standalone: true,
  templateUrl: './bottom-navigator.component.html',
  styleUrls: ['./bottom-navigator.component.css'],
})
export class BottomNavigatorComponent {
  activeMenu: string = 'dashboard'; // Menu ativo

  constructor(private router: Router) {}

  navigateTo(menu: string) {
    this.activeMenu = menu;
    this.router.navigate([menu]);
  }

  getIndicatorPosition(): number {
    const menuWidth = window.innerWidth / 3; // Divida pela quantidade de menus
    switch (this.activeMenu) {
      case 'dashboard':
        return 0;
      case 'register':
        return menuWidth;
      case 'profile':
        return menuWidth * 2;
      default:
        return 0;
    }
  }
}
