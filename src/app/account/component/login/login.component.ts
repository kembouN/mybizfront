import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  authService = inject(AuthService);
  router = inject(Router);
  toastService = inject(ToastService);
  initialLoginRequest: LoginRequest = {
    username: "",
    pass: ""
  };


  onSubmit(): void{
    this.authService.userLogin(this.initialLoginRequest).subscribe({
      next:(res) =>{
        localStorage.setItem("userToken", res.content.token);
        localStorage.setItem("userId", res.content.idUser.toString());
        localStorage.setItem("userName", res.content.username);
        localStorage.setItem("userEmail", res.content.email);
        this.router.navigate(['/choose-enterprise']);

      },
      error: (err) => {
        console.log(err);
        this.toastService.show(err.error.message ?? "Erreur inattendue lors de la connexion", "error");
      }
    });
  }
}
