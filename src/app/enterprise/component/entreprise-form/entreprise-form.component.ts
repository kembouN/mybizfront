import { Component, inject, Input, input, numberAttribute, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Enterprise, EnterpriseRequest } from '../../models/enterprise';
import { EntrepriseService } from '../../service/entreprise.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entreprise-form',
  imports: [FormsModule],
  templateUrl: './entreprise-form.component.html',
  styleUrl: './entreprise-form.component.scss'
})
export class EntrepriseFormComponent implements OnInit{

  entrepriseService = inject(EntrepriseService);
  toast = inject(ToastService);
  router = inject(Router);

  isEdit = input<boolean>();

  idUser = numberAttribute(localStorage.getItem("userId"));
  @Input() selectedEts!: Enterprise;
  initialForm!: EnterpriseRequest;


  ngOnInit(): void {
    if (this.selectedEts) {
      this.initialForm = {
        idUser: this.idUser,
        description: this.selectedEts.description || "",
        nom: this.selectedEts.nom || "",
        email: this.selectedEts.email || "",
        telephone1: this.selectedEts.telephone1 || undefined,
        telephone2: this.selectedEts.telephone2 || undefined,
        pays: this.selectedEts.pays || "",
        ville: this.selectedEts.ville || ""
      };
    } else {
      this.initialForm = {
        idUser: this.idUser,
        description: "",
        nom: "",
        email: "",
        telephone1: undefined,
        telephone2: undefined,
        pays: "",
        ville: ""
      };
    }
    console.log('InitialForm:', this.initialForm);
  }

  addEntreprise(){
    console.log(this.initialForm);
    this.entrepriseService.addEntreprise(this.initialForm).subscribe({
      next: (res) => {
      console.log(res.content)
      document.getElementById("modal-close-button")?.click();
      window.location.reload();;
      this.toast.show(res.message, "success")

    },
    error: (error) => {
      console.log(error)
      this.toast.show(error.error.message, 'error')
    }});

  }

  editEnterprise(){
    this.entrepriseService.updateEntreprise(this.selectedEts.entrepriseId, this.initialForm).subscribe({
      next: res => {
        console.log(res.message)
        document.getElementById("modal-close-button")?.click();
        window.location.reload();
        this.toast.show(res.message, "success");
      },
      error:(err) => {
        console.log(err.error.message);
        this.toast.show(err.error.message, 'error');
      },
    })
  }

  onSubmit() {
    if(this.isEdit() && this.selectedEts) {
      console.log("C'est une mise à jour");
      this.editEnterprise();
    }else {
      console.log("Ajout simple");
      this.addEntreprise();
    }
  }
}
