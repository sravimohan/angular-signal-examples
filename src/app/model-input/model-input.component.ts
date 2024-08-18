import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GithubLinkComponent } from '../github-link/github-link.component';
import { Author } from '../models';

@Component({
  selector: 'app-model-input',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, GithubLinkComponent],
  templateUrl: './model-input.component.html',
  styleUrl: './model-input.component.css'
})
export class ModelInputComponent {
  private _snackBar = inject(MatSnackBar);

  protected author = model<Author>({
    name: 'John Doe',
    lastUpdated: new Date(),
    books: [{ ISBN: '1234567890', title: 'My Book' }]
  });

  protected message = computed(() => `Number of Books: ${this.author().books.length}, Last updated: ${this.author().lastUpdated}`);

  constructor() {
    effect(() => {
      this.showNotification(`From Effect, Number of Books: ${this.author().books.length}, Last updated: ${this.author().lastUpdated}`);
    });
  }

  protected addBook() {
    this.author.update((value) => {
      value.books.push({ ISBN: '1234567890', title: 'My Book' });
      value.lastUpdated = new Date();

      // WARNING : Updating the author object directly will not trigger the change detection
      // return value;

      // Instead return a new object
      return { ...value };
    });
  }

  protected showNotification(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
