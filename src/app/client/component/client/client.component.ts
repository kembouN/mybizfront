import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { CustomModalComponent } from "../../../shared/components/custom-modal/custom-modal.component";
import { ClientFormComponent } from "../client-form/client-form.component";
import { ClientService } from '../../service/client.service';
import { ClientResponse } from '../../models/client';
import { CommonHeaderComponent } from "../../../shared/components/common-header/common-header.component";

@Component({
  selector: 'app-client',
  imports: [SideBarComponent, CustomModalComponent, ClientFormComponent, CommonHeaderComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{

  clientService = inject(ClientService);
  edit = false;

  clientFormOpened = false;
  nomUtilisateur = localStorage.getItem("userName");

  listClients!: ClientResponse[];
  clientToEdit!: ClientResponse;
  etsId = numberAttribute(localStorage.getItem("etsId"));

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

  ngOnInit(): void {
    this.clientService.getAllClientByEntreprise(this.etsId).subscribe(res => {
      this.listClients = res.content
    });
  }

}
