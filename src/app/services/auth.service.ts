import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userData = new BehaviorSubject<object>({});
  private _loggedIn = new BehaviorSubject<boolean>(false);

  public userData$ = this._userData.asObservable();
  public loggedIn$ = this._loggedIn.asObservable();

  public error: string = "";

  constructor(
    private router: Router,
    private apiService: ApiService,
    private tokenStorage: TokenService
  ) { }

  private updateSubjects(state: boolean, userData: object = {}) {
    this._loggedIn.next(state);
    this._userData.next(userData);

    this.tokenStorage.saveUser(userData);
  }

  getTokenStatus() {
    return !!this.tokenStorage.getToken();
  }

  getLoggedIn() {
    return this._loggedIn.getValue();
  }

  logout() {
    this.updateSubjects(false);

    this.tokenStorage.signOut();

    this.router.navigateByUrl("/login");
  }

  login(loginData: any, landingPage: string = '/home'): Promise<any> {
    return new Promise((resolve, reject) => {

      this.apiService.postApi('/auth', loginData).subscribe(
        (loginResponse: any) => {
          if (loginResponse?.accessToken) {

            this.tokenStorage.saveToken(loginResponse.accessToken);
            this.tokenStorage.saveRefreshToken(loginResponse.refreshToken || "coming soon");

            this.updateSubjects(true, loginResponse);

            this.router.navigate([landingPage]);

            resolve(loginResponse);
          } else {
            this.error = loginResponse.message;

            this.updateSubjects(false);

            reject(loginResponse);
          }

        },

        (error) => {
          this.error = error.message;
          this.updateSubjects(false);
          reject(error)
        });

    });
  }

  refreshState() {
    if (this.getTokenStatus()) {
      let user = this.tokenStorage.getUser();

      if (user) this.updateSubjects(true, user);
    }
  }


}
