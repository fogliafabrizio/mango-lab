import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private _http: HttpClient) {}

  private apiUrls = {
    dev: {
      backend: 'http://localhost:8080/actuator/health',
      database: 'http://localhost:8080/test/status/db',
      storage: 'http://localhost:8080/test/status/storage',
    },
    staging: {
      backend: 'https://staging-api.mangolab.com/actuator/health',
      database: 'https://staging-api.mangolab.com/status/db',
      storage: 'https://staging-api.mangolab.com/status/storage',
    },
    prod: {
      backend: 'https://api.mangolab.com/actuator/health',
      database: 'https://api.mangolab.com/status/db',
      storage: 'https://api.mangolab.com/status/storage',
    },
  };

  private currentEnv: 'dev' | 'staging' | 'prod' = 'dev';

  checkBackend(): Observable<any> {
    return this._http.get(this.apiUrls[this.currentEnv].backend);
  }

  checkDatabase(): Observable<any> {
    return this._http.get(this.apiUrls[this.currentEnv].database);
  }

  checkStorage(): Observable<any> {
    return this._http.get(this.apiUrls[this.currentEnv].storage);
  }
}
