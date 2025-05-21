import { Component, inject } from '@angular/core';
import { RegisterRequest } from '../../models/register';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  authService = inject(AuthService);
  toast = inject(ToastService);
  router = inject(Router);

  user!: RegisterRequest;

  initialUser: RegisterRequest = {
    email: "",
    username: "",
    pass: "",
    cPass: "",
  };
username: any;

  onSubmit(){
    this.authService.userRegistration(this.initialUser).subscribe({
      next: (res) => {
        this.toast.show(res.message, 'success')
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err.err)
        this.toast.show(err.error.message[0], 'error')
      }
    })
  }

}
