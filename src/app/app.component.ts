import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HttpClientModule],
  standalone: true,
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
