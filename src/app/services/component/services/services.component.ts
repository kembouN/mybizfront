import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { CustomModalComponent } from '../../../shared/components/custom-modal/custom-modal.component';
import { ServiceFormComponent } from "../service-form/service-form.component";
import { ServicesService } from '../../service/services.service';
import { ServiceResponse } from '../../models/services';
import { CommonHeaderComponent } from "../../../shared/components/common-header/common-header.component";

@Component({
  selector: 'app-services',
  imports: [SideBarComponent, CustomModalComponent, ServiceFormComponent, CommonHeaderComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})

export class ServicesComponent implements OnInit{

  servicesService = inject(ServicesService);

  serviceFormOpened = false;

  nomUtilisateur = localStorage.getItem("userName");
  etsId = numberAttribute(localStorage.getItem("etsId"));
  serviceToEdit!: ServiceResponse;
  edit = false;

  listService!: ServiceResponse[];

  openEditServiceForm(service: ServiceResponse) {
    this.serviceFormOpened = true;
    this.serviceToEdit = {...service};
    this.edit = true;
  }

  openServiceForm(){
    this.serviceFormOpened= true;
  }

  closeServiceForm(){
    this.serviceFormOpened= false;
  }

  ngOnInit(): void {
    this.servicesService.getEntrepriseServices(this.etsId).subscribe(res =>{
      this.listService = res.content
    })
  }

}
