import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class WebHidService {
  constructor() {}

  async requestDevice(): Promise<any> {
    const devices = await (navigator as any).hid.requestDevice({ filters: [] });
    return devices;
  }
}
