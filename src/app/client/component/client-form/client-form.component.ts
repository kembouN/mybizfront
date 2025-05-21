import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientRequest } from '../../models/client';
import { ClientService } from '../../service/client.service';
import { TrancheService } from '../../service/tranche.service';
import { Tranche, Typeprospect } from '../../models/tranche-type-propect';
import { ToastService } from '../../../shared/services/toast.service';

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


  initialForm: ClientRequest = {
    idUser: undefined as number |undefined,
    idService: undefined as number |undefined,
    idEntrprise: undefined as number |undefined,
    emailUn: "",
    emailDeux: "",
    nom: "",
    isClient: 0,
    telephoneUn: "",
    telephoneDeux: "",
    idTranche: undefined as number |undefined,
    idTypeprospect: undefined as number |undefined
  };

  listeTranche!: Tranche[];
  listeTypeProspect!: Typeprospect[];

  addClient(){
    // this.initialForm.isClient =;
    this.clientService.addClient(this.initialForm).subscribe({
      next:(res) =>{
        console.log(res);
        this.toast.show(res.message, 'success');
        document.getElementById("modal-close-button")?.click();
        window.location.reload()
      },
      error:(error => {
        console.log(error.error.message)
        this.toast.show(error.error.message, 'error')
      })
    });

  }

  ngOnInit(): void {
    this.tranche.getAllProspect().subscribe(res =>{
      this.listeTypeProspect = res.content
    });
    this.tranche.getAllTranche().subscribe(res => {
      this.listeTranche = res.content
    });
  }

  toggleTypeprospect() {
    console.log(this.initialForm.isClient)
  }



}
