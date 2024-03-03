import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  private readonly ENDPOINT: string =
    'https://hardwarevulnerabilityscannerservice.onrender.com';

  httpOptions = {
    headers: { 'Content-Type': 'application/json' },
    options: { withCredentials: true },
  };

  public get(path: string) {
    const url = `${this.ENDPOINT}/${path}`;
    return this.http.get(url, this.httpOptions);
  }

  public post(path: string, body: any) {
    const url = `${this.ENDPOINT}/${path}`;
    return this.http.post(url, body, this.httpOptions);
  }

  public put(path: string, data: any) {
    let url = `${this.ENDPOINT}/${path}`;
    return this.http.put(url, data, this.httpOptions);
  }

  public delete(path: string) {
    let url = `${this.ENDPOINT}/${path}`;
    return this.http.delete(url, this.httpOptions);
  }
}
