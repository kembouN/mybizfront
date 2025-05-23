import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { CustomModalComponent } from '../../../shared/components/custom-modal/custom-modal.component';
import { ServiceFormComponent } from "../service-form/service-form.component";
import { ServicesService } from '../../service/services.service';
import { ServiceResponse } from '../../models/services';

@Component({
  selector: 'app-services',
  imports: [SideBarComponent, CustomModalComponent, ServiceFormComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})

export class ServicesComponent implements OnInit{

  servicesService = inject(ServicesService);

  serviceFormOpened = false;

  nomUtilisateur = localStorage.getItem("userName");
  etsId = numberAttribute(localStorage.getItem("etsId"));


  listService!: ServiceResponse[];

  openServiceForm(){
    this.serviceFormOpened= true;
  }

  closeServiceForm(){
    this.serviceFormOpened= false;
  }

  ngOnInit(): void {
    this.servicesService.getEntrepriseServices(this.etsId).subscribe(res =>{
      this.listService = res.content
      console.log(res.message)
    })
  }

}
