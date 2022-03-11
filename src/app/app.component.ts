import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'mdb-nav-login';

  shared: any = {
    isLoggedIn: false,
    isModerator: false,
    isAdmin: false,
    user: {},
  };


  constructor(
    private auth: AuthService,
    private tokens: TokenService,
  ) {

  }

  ngOnInit(): void {
    this.auth.loggedIn$.subscribe(val => this.shared.isLoggedIn = val);
    this.auth.userData$.subscribe(val => this.shared.user = val);

    this.auth.refreshState();

    if (this.shared.isLoggedIn) {
      let user = this.tokens.getUser();

      this.shared.user = user;
      this.shared.isAdmin = user.roles.includes('ROLE_ADMIN');
      this.shared.isModerator = user.roles.includes('ROLE_MODERATOR');

      console.log('auth refreshState() called from app.comp: ', this.shared.user);
    }
  }


}
