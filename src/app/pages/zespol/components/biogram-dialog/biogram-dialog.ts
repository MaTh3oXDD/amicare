import { Component, HostListener, input, output } from '@angular/core';
import { Doctor } from '../../../../models/doctor';

@Component({
  selector: 'app-biogram-dialog',
  templateUrl: './biogram-dialog.html',
  styleUrl: './biogram-dialog.scss',
})
export class BiogramDialog {
  readonly doctor = input.required<Doctor>();
  readonly biogram = input.required<string[]>();
  readonly zamknij = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.zamknij.emit();
  }
}
