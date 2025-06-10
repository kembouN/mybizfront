import { Component, inject, input, numberAttribute, OnInit } from '@angular/core';
import { CollaborateurService } from '../../../collaborateur/service/collaborateur.service';
import { CollaborateurRsponse } from '../../../collaborateur/model/collaborateur';
import { CommandeService } from '../../service/commande.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-commande-affectation-form',
  imports: [FormsModule],
  templateUrl: './commande-affectation-form.component.html',
  styleUrl: './commande-affectation-form.component.scss'
})
export class CommandeAffectationFormComponent implements OnInit{

  collaborateurService = inject(CollaborateurService);
  commandeService = inject(CommandeService)
  toast = inject(ToastService);


  listeCollaborateurs!: CollaborateurRsponse[];
  etsId = numberAttribute(localStorage.getItem("etsId"));
  idCollab!: number;
  idCommande = input.required<number>();

  getAllCollab() {
    this.collaborateurService.getAllEtsCollaborateurs(this.etsId).subscribe( res => {
      this.listeCollaborateurs = res.content;
    })
  }

  ngOnInit(): void {
    this.getAllCollab();
    this.idCollab = 0;
  }

  assignCommandeToCollab() {
    this.commandeService.affectToCollaborateur(this.idCommande(), this.idCollab).subscribe({
      next: res => {
        this.toast.show(res.message, "success")
      },
      error: err => {
        console.log(err);
        this.toast.show(err.error.message ?? "Assignation échouée", 'error');
      }
    });
  }

}
