import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from '../models';

@Component({
  selector: 'app-with-input-child-component',
  standalone: true,
  imports: [CommonModule],
  template: `
      <p class="mat-title-medium">Child Input:</p>
      <pre>{{ author() | json }}</pre>
      <p class="mat-title-medium">Child Computed :</p>
      <pre>{{ message() | json }}</pre>
  `,
  styles: `:host { border: 1px solid #ccc; padding: 10px; margin: 10px; display: block; border-radius:5px; }`
})
export class WithInputChildComponent {
  private _snackBar = inject(MatSnackBar);
  author = input.required<Author>();

  protected message = computed(() => `Number of Books: ${this.author().books.length}, Last updated: ${this.author().lastUpdated}`);

  constructor() {
    effect(() => {
      this.showNotification(`From Child Effect, Number of Books: ${this.author().books.length}, Last updated: ${this.author().lastUpdated}`);
    });
  }

  protected showNotification(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
