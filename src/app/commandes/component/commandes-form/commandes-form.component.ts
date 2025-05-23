import { Component, inject, OnInit } from '@angular/core';
import { CustomModalComponent } from '../../../shared/components/custom-modal/custom-modal.component';
import { CommandeRequest } from '../../models/commande';
import { CommandeService } from '../../service/commande.service';
import { ToastService } from '../../../shared/services/toast.service';
import { ClientResponse } from '../../../client/models/client';
import { ServiceResponse } from '../../../services/models/services';
import { ClientService } from '../../../client/service/client.service';
import { ServicesService } from '../../../services/service/services.service';
import { FormsModule } from '@angular/forms';

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
  serviceService = inject(ServicesService);

  listeClients!: ClientResponse[];
  listeService!: ServiceResponse[];

  initialForm: CommandeRequest = {
    idService: undefined as number |undefined,
    idClient: undefined as number |undefined,
    avance: undefined as number |undefined,
    dateAvance: undefined as undefined | Date,
    dateContact: undefined as undefined | Date,
    dateDebut: undefined as undefined | Date,
    qte: undefined as number |undefined,
    duree: undefined as number |undefined,
    paye: false,
    datePaiement: undefined as undefined | Date,
    statut: "",
    dateFin: undefined as undefined | Date
  };

  avancePayee = false;
  quantitative = false;

  addCommande(){
    this.initialForm.avance = this.initialForm.avance ?? 0;
    this.commandeService.addCommande(this.initialForm).subscribe({
      next: (res) => {
        document.getElementById("modal-close-button")?.click();
        console.log(res.content);
        this.toast.show(res.message, "success");
      },
      error: (err) => {
        console.log(err);
        this.toast.show(err.error.message, 'error');
      }
    });
  }

  ngOnInit(): void {
    document.getElementById("reset-form-button")?.click()
    this.clientService.getAllRegisteredClient().subscribe(res => {
      this.listeClients = res.content;
    });
    this.serviceService.getEntrepriseServices(1).subscribe(res => {
      this.listeService = res.content;
    });
  }

}
