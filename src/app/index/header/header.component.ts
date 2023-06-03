import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'bk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
