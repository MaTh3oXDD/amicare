import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

export type TypFormularza = 'kontakt' | 'wywiad' | 'badanie-kliniczne';

interface OdpowiedzApi {
  ok: boolean;
  blad?: string;
}

@Injectable({ providedIn: 'root' })
export class Formularze {
  private readonly http = inject(HttpClient);

  async wyslij(typ: TypFormularza, dane: Record<string, unknown>): Promise<boolean> {
    try {
      const odp = await firstValueFrom(
        this.http.post<OdpowiedzApi>(`${API_CONFIG.formularzEndpoint}/${typ}`, dane),
      );
      return odp.ok === true;
    } catch {
      return false;
    }
  }
}
