import { Component, inject, input, Input, numberAttribute, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceRequest, ServiceResponse } from '../../models/services';
import { ServicesService } from '../../service/services.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-service-form',
  imports: [FormsModule],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.scss'
})
export class ServiceFormComponent implements OnInit{

  serviceService = inject(ServicesService);
  router = inject(Router);
  toast = inject(ToastService);

  @Input() selectedService!: ServiceResponse;
  idEntreprise = numberAttribute(localStorage.getItem("etsId"))
  idUser = numberAttribute(localStorage.getItem("userId"));
  serviceFormOpened = false;
  isEdit = input<boolean>();
  initialForm!: ServiceRequest;

  ngOnInit(): void {
    if(this.selectedService) {
      this.initialForm = {
        idUser: this.idUser,
        idEntreprise: this.idEntreprise,
        description: this.selectedService.description,
        libelle: this.selectedService.libelle ,
      };
      console.log(this.initialForm);
      console.log(this.selectedService);
      
    }else {
      this.initialForm = {
        idUser: this.idUser,
        idEntreprise: this.idEntreprise,
        description: "",
        libelle: ""
      };
    }
  }

  closeServiceForm(){
    this.serviceFormOpened= false;
  }

  addService(){
    this.serviceService.addService(this.initialForm).subscribe({
      next: (res) => {
        this.toast.show(res.message, "success")
        document.getElementById("modal-close-button")?.click();
        this.router.navigate(['services']);
      },
      error: (err) => {
        this.toast.show(err.error.message, 'error')
        document.getElementById("modal-close-button")?.click();
      }
    });
  }


  onUpdateService() {
    this.serviceService.updateService(this.selectedService.idService, this.initialForm).subscribe({
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
    if(this.isEdit() && this.selectedService) {
      console.log("Modofication du service")
      this.onUpdateService();
    }else {
      console.log("Nouveau service");
      this.addService();
    }
  }

}
