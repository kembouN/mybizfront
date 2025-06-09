import { Component, inject, input, Input, numberAttribute, OnInit } from '@angular/core';
import { CommandeRequest, CommandeResponse, ElementCommandeRequest } from '../../models/commande';
import { CommandeService } from '../../service/commande.service';
import { ToastService } from '../../../shared/services/toast.service';
import { ClientResponse } from '../../../client/models/client';
import { ClientService } from '../../../client/service/client.service';
import { FormsModule } from '@angular/forms';
import { SousServiceService } from '../../../sous-service/services/sous-service.service';
import { SousServiceResponse } from '../../../sous-service/models/sous-service';

@Component({
  selector: 'app-commandes-form',
  imports: [FormsModule],
  templateUrl: './commandes-form.component.html',
  styleUrl: './commandes-form.component.scss'
})
export class CommandesFormComponent implements OnInit{

  commandeService = inject(CommandeService);
  toast = inject(ToastService);
  clientService = inject(ClientService);
  sousserviceService = inject(SousServiceService);

  @Input() selectedCommande!: CommandeResponse;
  isEdit = input<boolean>();
  listeClients!: ClientResponse[];
  listeSousservice!: SousServiceResponse[];
  etsId = numberAttribute(localStorage.getItem("etsId"));
  element: ElementCommandeRequest = {
    idSousservice: "",
    quantite: "",
    prix: ""
  }
  montantTotal = 0;
  initialForm!: CommandeRequest;

  addCommande(){
    this.initialForm.avance = this.initialForm.avance ?? 0;
    if(this.element.idSousservice !== "" && this.element.prix !== "" && this.element.quantite !== "") {
      this.initialForm.items?.push(this.element)
      this.element = {
        idSousservice: "",
        quantite: "",
        prix: ""
      };
    }

    this.commandeService.addCommande(this.initialForm).subscribe({
      next: (res) => {
        document.getElementById("modal-close-button")?.click();
        console.log(res.content);
        this.toast.show(res.message, "success");
        setTimeout(() => {
          window.location.reload();
        },3000);
      },
      error: (err) => {
        console.log(err);
        this.toast.show(err.error.message, 'error');
      }
    });
  }

  ngOnInit(): void {
    this.clientService.getAllClientByEntreprise(this.etsId).subscribe(res => {
      this.listeClients = res.content;
    });
    this.sousserviceService.getAllSousService(this.etsId).subscribe(res => {
      this.listeSousservice = res.content;
    });

    if(this.selectedCommande) {
      this.initialForm = {
        idClient: this.selectedCommande.idClient ,
        avance: this.selectedCommande.avance ,
        dateAvance: this.selectedCommande.dateAvance ,
        dateContact: this.selectedCommande.dateCommande ,
        paye: this.selectedCommande.paye,
        datePaiement: this.selectedCommande.datePaiement ,
        dateFin: this.selectedCommande.dateFin,
        items: this.selectedCommande.elements
      };
      this.montantTotalElement()
    }else {
      this.initialForm = {
        idClient: "" ,
        avance: undefined ,
        dateAvance: undefined ,
        dateContact: undefined ,
        paye: 0,
        datePaiement: undefined ,
        dateFin: undefined,
        items: []
      };
    }

  }

  montantTotalElement(){
    this.montantTotal = 0;
    this.initialForm.items.forEach(element => {
      this.montantTotal = (numberAttribute(element.prix) * numberAttribute(element.quantite)) + this.montantTotal;
    });
    this.montantTotal = numberAttribute(this.element.quantite) * numberAttribute(this.element.prix) + this.montantTotal;
  }

  addElementToCommande() {
    if(this.element.idSousservice !== "" && this.element.prix !== "" && this.element.quantite !== "") {
      this.initialForm.items?.push(this.element)
      this.element = {
        idSousservice: "",
        quantite: "",
        prix: ""
      };
      this.montantTotalElement();
    }else {
      this.toast.show("Vous avez des champs du service non renseignés", 'error');
    }
  }

  removeElementToCommande(element: ElementCommandeRequest) {
    let elementIndex = this.initialForm.items.indexOf(element);
    this.initialForm.items.splice(elementIndex, 1);
    this.montantTotal = this.montantTotal - (numberAttribute(element.prix) * numberAttribute(element.quantite));
  }


  findSousServiceLibelle(id: number | string): string {
    let nom = "";
    for(const object of this.listeSousservice) {
      if(object.idSousService === numberAttribute(id)){
        nom = object.libelle
      }
    }
    return nom;
  }
  togglepaye(e: Event) {
    const checbox = e.target as HTMLInputElement
    if(checbox.checked){
      this.initialForm.paye = 1;

    }
    this.initialForm.paye = checbox.checked ? 1 : 0;
    // console.log(this.initialForm.isClient)

  }

  updateCommande() {
    console.log(this.initialForm);

    if(this.element.idSousservice !== "" && this.element.prix !== "" && this.element.quantite !== "") {
      this.initialForm.items.push(this.element)
      this.element = {
        idSousservice: "",
        quantite: "",
        prix: ""
      };
    }
    this.commandeService.updateCommande(this.selectedCommande.idCommande, this.initialForm).subscribe({
      next: (res) => {
        document.getElementById("modal-close-button")?.click();
        console.log(res.content);
        this.toast.show(res.message, "success");
        setTimeout(() => {
          window.location.reload();
        },3000);
      },
      error: (err) => {
        console.log(err);
        this.toast.show(err.error.message, 'error');
      }
    });

  }

  onSubmit() {
    if(this.isEdit() && this.selectedCommande) {
      console.log("Modification");
      this.updateCommande();
    }else {
      console.log("Ajout");
      this.addCommande();
    }
  }
}
