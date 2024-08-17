import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GithubLinkComponent } from "../github-link/github-link.component";

@Component({
  selector: 'primitive-types',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, GithubLinkComponent],
  templateUrl: './primitive-types.component.html',
  styleUrl: './primitive-types.component.css'
})
export class PrimitiveTypesComponent {
  private _snackBar = inject(MatSnackBar);

  protected count = signal(0);

  protected message = computed(() => `You have clicked  ${this.count()} times`);

  constructor() {
    effect(() => {
      this.showNotification(`Effect Message : You have clicked  ${this.count()} times`);
    });
  }

  protected add() {
    this.count.update((value) => value + 1);
  }

  protected showNotification(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
