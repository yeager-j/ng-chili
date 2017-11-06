import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  userName: string;
  password: string;
  itemID = 'ee80b16f-c78c-4996-b1a2-789455b30f71';
  error;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    try {
      await this.authService.getEditorUrl(this.userName, this.password, this.itemID);
      await this.router.navigate(['/editor']);
    } catch (e) {
      console.log(e);
      this.error = e;
    }
  }
}
