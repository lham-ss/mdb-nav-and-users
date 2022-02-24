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

  constructor(private router: Router,
    private apiService: ApiService) {

  }

  public userData$ = this._userData.asObservable();
  public loggedIn$ = this._loggedIn.asObservable();

  error: string = "";

  getToken() {
    return !!localStorage.getItem("admin-token");
  }

  logout() {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("admin-data");

    this.router.navigateByUrl("/login");
  }

  login(loginData: any) {
    // const loginData = this.loginForm.value;

    console.log(loginData);

    this.apiService.postApi('/auth', loginData).subscribe(
      (loginResponse: any) => {

        console.log(loginResponse);

        if (loginResponse?.auth) {
          localStorage.setItem('admin-token', loginResponse.token);
          localStorage.setItem('admin-data', JSON.stringify(loginResponse.result));

          this.error = "";

          this._loggedIn.next(true);
          this._userData.next(loginResponse.result)

          this.router.navigate(['/support-chat']);
        } else {
          this.error = loginResponse.message;

          this._loggedIn.next(false);
          this._userData.next({});

          console.log('error ===> ', this.error);
        }
      }
    );

  }

}
