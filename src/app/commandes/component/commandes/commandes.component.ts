import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { CustomModalComponent } from "../../../shared/components/custom-modal/custom-modal.component";
import { CommandesFormComponent } from "../commandes-form/commandes-form.component";
import { CommandeService } from '../../service/commande.service';
import { CommandeResponse } from '../../models/commande';
import { CommonHeaderComponent } from "../../../shared/components/common-header/common-header.component";
import { ToastService } from '../../../shared/services/toast.service';
import { CommandeAffectationFormComponent } from "../commande-affectation-form/commande-affectation-form.component";

@Component({
  selector: 'app-commandes',
  imports: [SideBarComponent, CustomModalComponent, CommandesFormComponent, CommonHeaderComponent, CommandeAffectationFormComponent],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.scss'
})
export class CommandesComponent implements OnInit{

  commandeService = inject(CommandeService);
  toast = inject(ToastService);

  commandeFormOpened = false
  affectCollabModalOpened = false;
  listCommandes!: CommandeResponse[];
  etsId = numberAttribute(localStorage.getItem("etsId"));
  edit = false;
  commandeToEdit!: CommandeResponse;
  idCommandToAssign!: number;

  openCommandemodal():void {
    this.commandeFormOpened = true;
  }

  openAffectModal(idCommande: number) {
    this.idCommandToAssign = idCommande;
    this.affectCollabModalOpened = true;
  }

  openEditModal(commande: CommandeResponse): void {
    this.commandeFormOpened = true;
    this.commandeToEdit = {...commande};
    this.edit = true;
  }

  closeCommandemodal(): void {
    this.commandeFormOpened = false;
    this.affectCollabModalOpened = false;
    window.location.reload();
  }

  ngOnInit(): void {
    this.commandeService.getAllCommandesByEntreprise(this.etsId).subscribe(res => {
      this.listCommandes = res.content
    });
  }

  terminateCommande(idCommande: number) {
    this.commandeService.commandeDone(idCommande).subscribe({
      next: res => {
        this.toast.show(res.message, 'success')
        setTimeout(() => {
          window.location.reload();
        },1000);
      },
      error: err => {
        console.log(err);
        this.toast.show(err.error.message, 'error')
      }
    });
  }

}
