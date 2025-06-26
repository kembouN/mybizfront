import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { CommonHeaderComponent } from "../../../shared/components/common-header/common-header.component";
import { ClientService } from '../../../client/service/client.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { UpdateUser } from '../../models/update-user';
import { ChangePasswordRequest } from '../../models/change-password';
import { Enterprise, EnterpriseRequest } from '../../../enterprise/models/enterprise';
import { Pays } from '../../../shared/models/pays';
import { FormsModule } from '@angular/forms';
import { EntrepriseService } from '../../../enterprise/service/entreprise.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profil',
  imports: [SideBarComponent, CommonHeaderComponent, FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit{

  clientService = inject(ClientService);
  entrepriseService = inject(EntrepriseService);
  utilisateurServise = inject(AuthService);
  toast = inject(ToastService);
  router = inject(Router);

  initialUserForm!: UpdateUser;
  initialPasswordForm: ChangePasswordRequest = {
    password: "",
    newPassword: "",
    cpassword: ""
  }
  initialEnterpriseForm!: EnterpriseRequest;
  listePays!: Pays[];

  idUser = numberAttribute(localStorage.getItem("userId"));
  idEts = numberAttribute(localStorage.getItem("etsId"));
  connectedEts!: Enterprise;
  codeTel ="";

  triggerInputFile() {
    // document.getElementById("fileInput")?.click();
  }

  ngOnInit(): void {
    this.clientService.getAllPays().subscribe(res => {
      this.listePays = res.content
    });
    this.entrepriseService.getSpecificEntreprise(this.idEts).subscribe(res => {
      this.connectedEts = res.content

      this.initialEnterpriseForm = {
        idUser: this.idUser,
        nom: this.connectedEts?.nom,
        email: this.connectedEts?.email,
        description: this.connectedEts?.description,
        telephone1: this.connectedEts?.telephone1,
        telephone2: this.connectedEts?.telephone2,
        idPays: this.connectedEts?.pays.idPays,
        ville: this.connectedEts?.ville
      };
      this.codeTel = this.connectedEts?.pays.codePays;

    });

    this.initialUserForm = {
      nom: localStorage.getItem("userName") ?? "",
      email: localStorage.getItem("userEmail") ?? ""
    };

  }

  onSelectPays(pays: Pays) {
    this.codeTel = pays.codePays
  }

  submitUserUpdate() {
    this.utilisateurServise.updateUser(this.idUser, this.initialUserForm).subscribe({
      next: res => {
        console.log(res.content);

        localStorage.setItem("userName", res.content.username)
        localStorage.setItem("userEmail", res.content.email)
        setTimeout(() => {
          window.location.reload();
        },1000);
        this.toast.show(res.message, "success")
      },
      error: (error) => {
      console.log(error)
      this.toast.show(error.error.message, 'error')
    }
    });
  }

  submitChangePassword() {
    this.utilisateurServise.changePassword(this.idUser, this.initialPasswordForm).subscribe({
      next: res => {
        setTimeout(() => {
          window.location.reload();
        },1000);
        this.toast.show(res.message, "success")
      },
      error: (error) => {
        console.log(error)
        this.toast.show(error.error.message, 'error')
      }
    });
  }

  submitUpdateEntreprise() {
    console.log(this.initialEnterpriseForm);

    this.entrepriseService.updateEntreprise(this.idEts, this.initialEnterpriseForm).subscribe({
      next: res => {
        localStorage.setItem("nomEts", res.content)
        setTimeout(() => {
          window.location.reload();
        },1000);
        this.toast.show(res.message, "success")
      },
      error: (error) => {
        console.log(error)
        this.toast.show(error.error.message, 'error')
      }
    });
  }

}
