import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseApiPath = environment.api + "/api";

  constructor(
    private http: HttpClient
  ) { }

  getApi(path: string) {
    return this.http.get(this.baseApiPath + path);
  }

  postApi(path: string, data: object) {
    return this.http.post(this.baseApiPath + path, data);
  }

  putApi(path: string, data: object) {
    return this.http.put(this.baseApiPath + path, data);
  }

  patchApi(path: string, data: object) {
    return this.http.patch(this.baseApiPath + path, data);
  }

  deleteApi(path: string) {
    return this.http.delete(this.baseApiPath + path);
  }

  /*
  postApiWithCatchError(path: string, data: object): Observable<any> {
    return this.http.post(this.baseApiPath + path, data).pipe(
      map(val => {

        return val;
      }),
      catchError((err) => {
        console.error('Caught: ', err);
        return err;
      })
    )
  }
  */
}
