import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { Author } from '../models';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-with-model-child-component',
  standalone: true,
  imports: [CommonModule, MatFormField, MatButton, MatLabel, MatInput, FormsModule],
  template: `
      <p class="mat-title-medium">Child Model Signal:</p>
      <pre>{{ author() | json }}</pre>
      <p class="mat-title-medium">Child Form:</p>
      <div class="mat-body">
        <mat-form-field class="example-full-width">
          <mat-label>Author name</mat-label>
          <input matInput [(ngModel)]="author().name">
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="update()">Update</button>
      </div>
  `,
  styles: `
    :host { border: 1px solid #ccc; padding: 10px; margin: 10px; display: block; border-radius:5px; }
    .mat-body { display: flex; flex-direction: column; align-items: start; }`
})
export class WithModelChildComponent {
  author = model.required<Author>();

  update() {
    this.author.update((value) => {
      value.name = this.author().name
      value.lastUpdated = new Date();

      // WARNING : Updating the author object directly will not trigger the change detection
      // return value;

      // Instead return a new object
      return { ...value };
    });
  }
}
