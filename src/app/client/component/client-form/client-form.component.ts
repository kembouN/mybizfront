import { Component, inject, input, Input, numberAttribute, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientRequest, ClientResponse } from '../../models/client';
import { ClientService } from '../../service/client.service';
import { TrancheService } from '../../service/tranche.service';
import { Tranche, Typeprospect } from '../../models/tranche-type-propect';
import { ToastService } from '../../../shared/services/toast.service';
import { Pays } from '../../../shared/models/pays';

@Component({
  selector: 'app-client-form',
  imports: [FormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit{

  clientService = inject(ClientService);
  tranche = inject(TrancheService);
  toast = inject(ToastService);

  @Input() selectedClient!: ClientResponse;
  initialForm!: ClientRequest;
  listeTranche!: Tranche[];
  listeTypeProspect!: Typeprospect[];
  listePays!: Pays[];
  isEdit = input<boolean>();
  etsId = numberAttribute(localStorage.getItem("etsId"));
  idUser = numberAttribute(localStorage.getItem("userId"));
  codeTel!: string | undefined;
  displayTelWhatsapp!: boolean;

  ngOnInit(): void {
    this.codeTel = "";
    this.tranche.getAllProspect().subscribe(res =>{
      this.listeTypeProspect = res.content
    });
    this.tranche.getAllTranche().subscribe(res => {
      this.listeTranche = res.content
    });
    this.clientService.getAllPays().subscribe(res => {
      this.listePays = res.content
    });
    if(this.selectedClient){
      this.initialForm = {
        idUser: this.idUser,
        idEntreprise: 0,
        emailUn: this.selectedClient.emailUn,
        emailDeux: this.selectedClient.emailDeux,
        nom: this.selectedClient.nomClient,
        isClient: this.selectedClient.statut === "Client" ? 1 : 0,
        telephoneUn: this.selectedClient.telephoneUn,
        telephoneDeux: this.selectedClient.telephoneDeux,
        idTranche: this.selectedClient.trancheId,
        idTypeprospect: this.selectedClient.typeprospectId,
        typeClient: this.selectedClient.typeClient,
        agentLiaison: this.selectedClient.agentLiaison,
        paysId: this.selectedClient.pays.idPays,
        ville: this.selectedClient.ville,
        adresse: this.selectedClient.adresse,
        // isWhatsapp: this.selectedClient.isWhatsapp
      };
      // this.codeTel = this.listePays.find( e => e.idPays === this.initialForm.paysId )?.codePays
      // this.displayTelWhatsapp = this.initialForm.isWhatsapp != 0;

    }else {
      this.initialForm = {
        idUser: this.idUser,
        idEntreprise: this.etsId,
        emailUn: "",
        emailDeux: "",
        nom: "",
        isClient: 0,
        telephoneUn: "",
        telephoneDeux: "",
        idTranche: undefined,
        idTypeprospect: undefined,
        typeClient: "",
        agentLiaison: "",
        paysId: undefined,
        ville: "",
        adresse: "",
        // isWhatsapp: this.displayTelWhatsapp ? 1 : 0
      };
      this.displayTelWhatsapp = false;

    }
  }

  toggleTypeprospect(e: Event) {
    const checbox = e.target as HTMLInputElement
    this.initialForm.isClient = checbox.checked ? 1 : 0;
    console.log(this.initialForm.isClient)
  }

  addClient(){
    console.log(this.initialForm);

    if(this.initialForm.isClient == 1){
      this.initialForm.idTypeprospect = 0
    }
    this.clientService.addClient(this.initialForm).subscribe({
      next:(res) =>{
        console.log(res);
        this.toast.show(res.message, 'success');
        document.getElementById("modal-close-button")?.click();
        setTimeout(() => {
          window.location.reload();
        },3000);
      },
      error:(error => {
        console.log(error.error.message)
        this.toast.show(error.error.message, 'error')
      })
    });

  }

  onUpdateClient() {
    if(this.initialForm.isClient == 1){
      this.initialForm.idTypeprospect = 0
    }

    this.initialForm.idTypeprospect ??= 0;

    console.log("format update", this.initialForm)
    console.log("clientId", this.selectedClient.idClient)

    this.clientService.updateClient(this.selectedClient.idClient, this.initialForm).subscribe({
      next: res => {
        console.log(res.message)
        document.getElementById("modal-close-button")?.click();
        this.toast.show(res.message, "success");
        setTimeout(() => {
          window.location.reload();
        },3000);
      },
      error: err => {
        console.log(err.error.message);
        this.toast.show(err.error.message, 'error');
      }
    });
  }

  onSubmit(){
    if(this.isEdit() && this.selectedClient){
      console.log("Modification des infos client");
      this.onUpdateClient();
    }else {
      console.log("Ajout");
      this.addClient();
    }
  }

  onSelectPays(pays: Pays) {
    this.codeTel = pays.codePays
  }

  onReset() {
    this.codeTel= ""
  }

}
