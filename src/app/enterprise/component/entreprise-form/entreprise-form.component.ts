import { Component, inject, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnterpriseRequest } from '../../models/enterprise';
import { EntrepriseService } from '../../service/entreprise.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entreprise-form',
  imports: [FormsModule],
  templateUrl: './entreprise-form.component.html',
  styleUrl: './entreprise-form.component.scss'
})
export class EntrepriseFormComponent {

  entrepriseService = inject(EntrepriseService);
  toast = inject(ToastService);
  router = inject(Router);

  idUser = numberAttribute(localStorage.getItem("userId"));
  initialForm: EnterpriseRequest = {
    idUser : this.idUser,
    description: "",
    nom: "",
    email: "",
    telephone1: undefined as undefined | number,
    telephone2: undefined as undefined | number,
    localisation: ""
  };

  addEntreprise(){
    console.log(this.initialForm);
    this.entrepriseService.addEntreprise(this.initialForm).subscribe({
      next: (res) => {
      console.log(res.content)
      document.getElementById("modal-close-button")?.click();
      this.router.navigate(['enterprises']);
      this.toast.show(res.message, "success")

    },
    error: (error) => {
      console.log(error)
      this.toast.show(error.error.message, 'error')
    }});

  }
}
