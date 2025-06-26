import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { CustomModalComponent } from "../../../shared/components/custom-modal/custom-modal.component";
import { ClientFormComponent } from "../client-form/client-form.component";
import { ClientService } from '../../service/client.service';
import { ClientResponse } from '../../models/client';
import { CommonHeaderComponent } from "../../../shared/components/common-header/common-header.component";
import { MessagesComponent } from "../../../shared/components/messages/messages.component";
import { Typeprospect } from '../../models/tranche-type-propect';
import { TrancheService } from '../../service/tranche.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  imports: [SideBarComponent, CustomModalComponent, ClientFormComponent, CommonHeaderComponent, MessagesComponent, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{

  // Injection des services
  clientService = inject(ClientService);
  typeprospectService = inject(TrancheService);
  // Gestion des modales
  edit = false;
  oneReceiver!: boolean;
  clientFormOpened = false;
  messageOpen = false;

  // Données du filtre
  nom = "";
  localisation = "";
  typeProspect = "";
  typeClient = "";

  selectedClients: number[] = [];
  listClients!: ClientResponse[];
  clientToEdit!: ClientResponse;
  etsId = numberAttribute(localStorage.getItem("etsId"));
  listeTypeprospect!: Typeprospect[];

  openClientForm(){
    this.clientFormOpened= true;
  }

  openEditClientForm(client: ClientResponse) {
    this.clientFormOpened = true;
    this.clientToEdit = {...client};
    this.edit = true;
  }

  closeClientForm(){
    this.clientFormOpened= false;
  }

  getListeClients() {
    this.clientService.getAllClientByEntreprise(
      this.etsId,
      this.nom,
      this.typeClient,
      this.localisation,
      this.typeProspect
    ).subscribe(res => {
      this.listClients = res.content
    });
  }

  ngOnInit(): void {
    this.typeprospectService.getAllProspect().subscribe(res => {
      this.listeTypeprospect = res.content
    });
    this.getListeClients();

  }

  openMessageModalForone(clientId: number) {
    this.messageOpen = !this.messageOpen;
    if(!this.selectedClients.includes(clientId)){
      this.selectedClients.push(clientId);
    }
    this.oneReceiver = true;
  }

  openMessageModalForMore() {
    this.listClients.forEach(client => {
      this.selectedClients.push(client.idClient)
    });
    this.messageOpen = !this.messageOpen;
    this.oneReceiver = false;
  }

  closeMessageBox(){
    this.messageOpen =false;
  }

}
