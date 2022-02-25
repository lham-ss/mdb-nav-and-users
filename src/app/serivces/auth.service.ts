import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userData = new BehaviorSubject<object>({});
  private _loggedIn = new BehaviorSubject<boolean>(false);

  public userData$ = this._userData.asObservable();
  public loggedIn$ = this._loggedIn.asObservable();

  public error: string = "";

  constructor(private router: Router, private apiService: ApiService) {
  }

  private updateSubjects(state: boolean, userData: object) {
    this._loggedIn.next(state);
    this._userData.next(userData);
  }

  getToken() {
    return !!localStorage.getItem("admin-token");
  }

  logout() {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("admin-data");

    this.updateSubjects(false, {});

    this.router.navigateByUrl("/login");
  }

  login(loginData: any, landingPage: string = '/home'): Promise<any> {
    return new Promise((resolve, reject) => {

      this.apiService.postApi('/auth', loginData).subscribe((loginResponse: any) => {
        if (loginResponse?.auth) {

          localStorage.setItem('admin-token', loginResponse.token);
          localStorage.setItem('admin-data', JSON.stringify(loginResponse.result));

          this.updateSubjects(true, loginResponse.result);

          this.router.navigate([landingPage]);

          resolve(loginResponse);
        } else {
          this.error = loginResponse.message;

          this.updateSubjects(false, {});

          reject(loginResponse);
        }

      },

        (error) => {
          reject(error)
        });

    });
  }


  // handle browser refresh to keep login state
  refresh() {
    let token = localStorage.getItem('admin-token');

    if (!token) {
      this.updateSubjects(false, {});
      return;
    }

  }

}
