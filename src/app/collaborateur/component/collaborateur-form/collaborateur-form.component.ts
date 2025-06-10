import { Component, inject, input, Input, numberAttribute, OnInit } from '@angular/core';
import { CollaborateurService } from '../../service/collaborateur.service';
import { ClientService } from '../../../client/service/client.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CollaborateurRequest, CollaborateurRsponse } from '../../model/collaborateur';
import { Pays } from '../../../shared/models/pays';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collaborateur-form',
  imports: [FormsModule],
  templateUrl: './collaborateur-form.component.html',
  styleUrl: './collaborateur-form.component.scss'
})
export class CollaborateurFormComponent implements OnInit {

  collabService = inject(CollaborateurService);
  paysService = inject(ClientService);
  toast = inject(ToastService);

  @Input() selectedCollab!: CollaborateurRsponse;
  initialForm!: CollaborateurRequest;
  listePays!: Pays[];
  isEdit = input<boolean>();
  etsId = numberAttribute(localStorage.getItem("etsId"));
  codeTel!: string | undefined;
  displayTelWhatsapp =false;

  ngOnInit(): void {
    this.codeTel ="";
    this.paysService.getAllPays().subscribe(res => {
      this.listePays = res.content
    });

    if (this.selectedCollab && this.isEdit() ) {
      this.initialForm = {
        idEntreprise: this.etsId,
        idPays: this.selectedCollab.pays.idPays,
        nomCollaborateur: this.selectedCollab.nom,
        telephoneUn: this.selectedCollab.telephoneUn,
        telephoneDeux: this.selectedCollab.telephoneDeux,
        ville: this.selectedCollab.ville,
        adresse: this.selectedCollab.adresse
      }
    }else {
      this.initialForm = {
        idEntreprise: this.etsId,
        idPays: 0,
        nomCollaborateur: "",
        telephoneUn: "",
        telephoneDeux: "",
        ville: "",
        adresse: ""
      }
    }
  }

  addCollab() {
    this.collabService.addCollaborateur(this.initialForm).subscribe({
      next: res => {
        this.toast.show(res.message, 'success');
        document.getElementById("modal-close-button")?.click();
        setTimeout(() => {
          window.location.reload();
        },3000);
      },
      error: error => {
        console.log(error.error.message)
        this.toast.show(error.error.message, 'error')
      }
    })
  }

  updateCollab(){
    this.collabService.updateCollaborateur(this.selectedCollab.idCollaborateur, this.initialForm).subscribe({
      next: res => {
        this.toast.show(res.message, 'success');
        document.getElementById("modal-close-button")?.click();
        setTimeout(() => {
          window.location.reload();
        },3000);
      },
      error: error => {
        console.log(error.error.message)
        this.toast.show(error.error.message, 'error')
      }
    })
  }

  onSubmit() {
    if (this.isEdit() && this.selectedCollab) {
      console.log("Mofification");
      this.updateCollab();
    }else{
      console.log("Ajout");
      this.addCollab()
    }
  }

  onSelectPays(pays: Pays) {
    this.codeTel = pays.codePays
  }

  onReset() {
    this.codeTel = "";
  }

}
