import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private _http: HttpClient) {}

  private urls = environment.apiUrls;

  checkBackend(): Observable<any> {
    return this._http.get(this.urls.backend);
  }

  checkDatabase(): Observable<any> {
    return this._http.get(this.urls.database);
  }

  checkStorage(): Observable<any> {
    return this._http.get(this.urls.storage);
  }

  inserisciNelDatabase(): Observable<any> {
    return this._http.post(this.urls.insert, {});
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this._http.post(this.urls.upload, formData);
  }

  listaFile(): Observable<any> {
    return this._http.get(this.urls.list);
  }
}
