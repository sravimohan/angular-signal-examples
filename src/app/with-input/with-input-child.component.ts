import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, output } from '@angular/core';
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
  styles: `
    :host { border: 1px solid #ccc; padding: 10px; margin: 10px; display: block; border-radius:5px; }
    :host[data-number-of-books="1"] {background-color: coral;}
    :host[data-number-of-books="2"] {background-color: pink;}
    :host[data-number-of-books="3"] {background-color: blue;}
    `,
  host: {
    '[attr.data-number-of-books]': "numberOfBooks()",
  }
})
export class WithInputChildComponent {
  private _snackBar = inject(MatSnackBar);

  // input is a signal
  author = input.required<Author>();

  // output is not a signal. It is an EventEmitte with a nicer syntax
  authorUpdated = output<Author>();

  numberOfBooks = computed(() => this.author().books.length);

  protected message = computed(() => `Number of Books: ${this.author().books.length}, Last updated: ${this.author().lastUpdated}`);

  constructor() {
    effect(() => {
      this.showNotification(`From Child Effect, Number of Books: ${this.author().books.length}, Last updated: ${this.author().lastUpdated}`);

      // emit the updated author
      this.authorUpdated.emit(this.author());
    });
  }

  protected showNotification(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
