import { Component, inject, input, Input, numberAttribute, OnInit } from '@angular/core';
import { SousServiceService } from '../../services/sous-service.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { SousServiceRequest, SousServiceResponse } from '../../models/sous-service';
import { ServicesService } from '../../../services/service/services.service';
import { ServiceResponse } from '../../../services/models/services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sous-service-form',
  imports: [FormsModule],
  templateUrl: './sous-service-form.component.html',
  styleUrl: './sous-service-form.component.scss'
})
export class SousServiceFormComponent implements OnInit{

  sousserviceService = inject(SousServiceService);
  serviceService = inject(ServicesService);
  router = inject(Router);
  toast = inject(ToastService);

  @Input() selectedSousservice!: SousServiceResponse;
  etsId = numberAttribute(localStorage.getItem("etsId"));
  isEdit = input<boolean>();
  initialForm!: SousServiceRequest;
  listServices!: ServiceResponse[];

  ngOnInit(): void {
    this.serviceService.getEntrepriseServices(this.etsId).subscribe(res => {
      console.log(res.content);

      this.listServices = res.content
    });

    if(this.selectedSousservice) {
      this.initialForm = {
        idService: this.selectedSousservice.idService,
        libelle: this.selectedSousservice.libelle,
        description: this.selectedSousservice.description,
        duree: this.selectedSousservice.duree,
        unite: this.selectedSousservice.unite,
      }
    }else {
      this.initialForm = {
        idService: "",
        libelle: "",
        description: "",
        duree: "",
        unite: ""
      }
    }

  }

  addSousService() {
    this.sousserviceService.addSousService(this.initialForm).subscribe({
      next: res => {
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
    })
  }

  onUpdateSousservice() {
    this.sousserviceService.updateSousService(this.selectedSousservice.idSousService, this.initialForm).subscribe({
      next: res => {
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

    })
  }

  onSubmit() {
    if(this.isEdit() && this.selectedSousservice) {
      console.log("Modification du sous service");
      this.onUpdateSousservice();

    }else {
      console.log("Nouveau sous-service");
      this.addSousService();
    }
  }

}
