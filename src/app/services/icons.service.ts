import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Icons } from '../enums/icons';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) { }

  public registerIcons(): void {
      this.loadIcons(Object.values(Icons), './assets/svg');
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
}
}