import { Component, inject, OnInit } from '@angular/core';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { CustomModalComponent } from "../../../shared/components/custom-modal/custom-modal.component";
import { CommandesFormComponent } from "../commandes-form/commandes-form.component";
import { CommandeService } from '../../service/commande.service';
import { CommandeResponse } from '../../models/commande';

@Component({
  selector: 'app-commandes',
  imports: [SideBarComponent, CustomModalComponent, CommandesFormComponent],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.scss'
})
export class CommandesComponent implements OnInit{

  commandeService = inject(CommandeService);

  nomUtilisateur = localStorage.getItem("userName");
  commandeFormOpened = false
  listCommandes!: CommandeResponse[];

  openCommandemodal():void {
    this.commandeFormOpened = true;
  }

  closeCommandemodal(): void {
    this.commandeFormOpened = false;
  }

  ngOnInit(): void {
    this.commandeService.getAllCommandesByEntreprise(1).subscribe(res => {
      console.log(res.content)
      this.listCommandes = res.content
    });
  }

}
