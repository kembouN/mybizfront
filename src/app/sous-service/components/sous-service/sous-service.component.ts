import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { SousServiceService } from '../../services/sous-service.service';
import { SousServiceResponse } from '../../models/sous-service';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { CommonHeaderComponent } from "../../../shared/components/common-header/common-header.component";
import { CustomModalComponent } from "../../../shared/components/custom-modal/custom-modal.component";
import { SousServiceFormComponent } from "../sous-service-form/sous-service-form.component";

@Component({
  selector: 'app-sous-service',
  imports: [SideBarComponent, CommonHeaderComponent, CustomModalComponent, SousServiceFormComponent],
  templateUrl: './sous-service.component.html',
  styleUrl: './sous-service.component.scss'
})
export class SousServiceComponent implements OnInit{

  sousserviceService = inject(SousServiceService);

  sousserviceFormOpened = false;
  etsId = numberAttribute(localStorage.getItem("etsId"));
  sousserviceToEdit!: SousServiceResponse;
  edit = false;
  listSousservice!: SousServiceResponse[];

  openSousserviceForm() {
    this.sousserviceFormOpened = true;
  }

  openEditSousserviceForm(sousservice: SousServiceResponse) {
    this.sousserviceFormOpened = true;
    this.sousserviceToEdit = sousservice;
    this.edit = true;
  }

  closeForm() {
    this.sousserviceFormOpened = false;
  }

  ngOnInit(): void {
    this.sousserviceService.getAllSousService(this.etsId).subscribe(res => {
      console.log(res.content);

      this.listSousservice = res.content;
    })
  }

}
