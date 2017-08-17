import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(public authService: AuthService) { }

  login() {
    this.authService.login();
    // this.notify.emit("You are logged in!");
  }

  logout() {
    this.authService.logout();
    // this.notify.emit("You are logged out!");
  }

  ngOnInit() {
  }

}
