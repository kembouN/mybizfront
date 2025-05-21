import { Component, inject, OnInit } from '@angular/core';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { CustomModalComponent } from "../../../shared/components/custom-modal/custom-modal.component";
import { ClientFormComponent } from "../client-form/client-form.component";
import { ClientService } from '../../service/client.service';
import { ClientResponse } from '../../models/client';

@Component({
  selector: 'app-client',
  imports: [SideBarComponent, CustomModalComponent, ClientFormComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{

  clientService = inject(ClientService);

  clientFormOpened = false;
  nomUtilisateur = localStorage.getItem("userName");

  listClients!: ClientResponse[];

  openClientForm(){
    this.clientFormOpened= true;
  }

  closeClientForm(){
    this.clientFormOpened= false;
  }

  ngOnInit(): void {
    this.clientService.getAllRegisteredClient().subscribe(res => {
      this.listClients = res.content
      console.log(this.listClients)
    });
  }

}
