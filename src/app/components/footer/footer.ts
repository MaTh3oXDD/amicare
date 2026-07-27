import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLACOWKI } from '../../models/placowka';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly placowki = PLACOWKI;
  protected readonly rok = new Date().getFullYear();
}
