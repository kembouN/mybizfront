import { AuthService } from './../../../account/services/auth.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-common-header',
  imports: [],
  templateUrl: './common-header.component.html',
  styleUrl: './common-header.component.scss'
})
export class CommonHeaderComponent {

  authService = inject(AuthService);

  nomEts = localStorage.getItem("nomEts");
  // logoEts = input<string>();

  logout() {
    this.authService.logout();
  }

}
