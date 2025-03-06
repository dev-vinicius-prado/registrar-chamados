import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div *ngIf="message" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span class="block sm:inline">{{ message }}</span>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class ErrorMessageComponent {
  @Input() message: string | null = null;
}
