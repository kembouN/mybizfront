import { Component, inject, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceRequest } from '../../models/services';
import { ServicesService } from '../../service/services.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-service-form',
  imports: [FormsModule],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.scss'
})
export class ServiceFormComponent {

  serviceService = inject(ServicesService);
  router = inject(Router);
  toast = inject(ToastService);


  idEntreprise = numberAttribute(localStorage.getItem)
  idUser = numberAttribute(localStorage.getItem("userId"));
  serviceFormOpened = false;

  initialForm: ServiceRequest = {
    idUser: this.idUser,
    idEntreprise: 1,
    description: "",
    libelle: "",
    dureeInitiale: 0,
    prixInitial: 0,
    qteInitiale:0
  };

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

}
