import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { GithubLinkComponent } from '../github-link/github-link.component';
import { Author } from '../models';
import { WithInputChildComponent } from './with-input-child.component';


@Component({
  selector: 'app-with-input',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatDividerModule,
    GithubLinkComponent, WithInputChildComponent
  ],
  styles: `mat-card-content { border: 1px solid #ccc; padding: 10px; margin: 10px; display: block; border-radius:5px; }`,
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>Input Signal</mat-card-title>
      <app-github-link path="tree/main/src/app/with-input" />
    </mat-card-header>
    <mat-divider></mat-divider>
    <mat-card-content>
      <p class="mat-title-medium">Parent Signal :</p>
      <pre>{{ author() | json }}</pre>
  
      <app-with-input-child-component 
        [author]="author()" 
        (authorUpdated)="authorUpdated($event)"
      />

      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="addBook()">
          Add Book
        </button>
      </mat-card-actions>
    </mat-card-content>
  </mat-card>
  `
})
export class WithInputComponent {
  protected author = signal<Author>({
    name: 'John Doe',
    lastUpdated: new Date(),
    books: [{ ISBN: '1234567890', title: 'My Book' }]
  });

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

  protected authorUpdated(event: Author) {
    console.log('Author Updated', event);
  }
}
