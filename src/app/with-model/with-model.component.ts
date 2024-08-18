import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { GithubLinkComponent } from '../github-link/github-link.component';
import { Author } from '../models';
import { WithModelChildComponent } from './with-model-child.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-with-model',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatDividerModule,
    GithubLinkComponent, WithModelChildComponent
  ],
  styles: `mat-card-content { border: 1px solid #ccc; padding: 10px; margin: 10px; display: block; border-radius:5px; }`,
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>Model Signal (Two-way binding)</mat-card-title>
      <app-github-link path="tree/main/src/app/with-model" />
    </mat-card-header>
    <mat-divider></mat-divider>
    <mat-card-content>
      <p class="mat-title-medium">Parent Variable :</p>
      <pre>{{ author | json }}</pre>
      <app-with-model-child-component [(author)]="author" (authorChange)="showNotification($event)" />
    </mat-card-content>
  </mat-card>
  `
})
export class WithModelComponent {
  private _snackBar = inject(MatSnackBar);

  protected author: Author = {
    name: 'John Doe',
    lastUpdated: new Date(),
    books: [{ ISBN: '1234567890', title: 'My Book' }]
  };

  protected showNotification(event: unknown) {
    const message = JSON.stringify(event);
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
