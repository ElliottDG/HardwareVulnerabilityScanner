import { Component } from '@angular/core';
import { IconsService } from '../services/icons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'Hardware Vulnerability Scanner';

  constructor(private iconsService: IconsService) {
  }

  isCompatible: boolean = true;
  ngOnInit(): void {
    this.iconsService.registerIcons();
    this.isChromium();
  }

  isChromium(): void {
    const userAgent = navigator.userAgent;
    this.isCompatible =  /Chrome|Chromium|Edg|OPR/.test(userAgent);
  }


}
