import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { CommonHeaderComponent } from "../../../shared/components/common-header/common-header.component";
import { CollaborateurService } from '../../service/collaborateur.service';
import { CollaborateurRsponse } from '../../model/collaborateur';
import { CustomModalComponent } from "../../../shared/components/custom-modal/custom-modal.component";
import { CollaborateurFormComponent } from "../collaborateur-form/collaborateur-form.component";

@Component({
  selector: 'app-collaborateur',
  imports: [SideBarComponent, CommonHeaderComponent, CustomModalComponent, CollaborateurFormComponent],
  templateUrl: './collaborateur.component.html',
  styleUrl: './collaborateur.component.scss'
})
export class CollaborateurComponent implements OnInit{

  collabService = inject(CollaborateurService);

  collabFormOpened = false;
  listCollabs!: CollaborateurRsponse[];
  etsId = numberAttribute(localStorage.getItem("etsId"));
  edit = false;
  collabToEdit!: CollaborateurRsponse;

  openModal() {
    this.collabFormOpened =true;
  }

  openEditCollab(collab: CollaborateurRsponse) {
    this.collabFormOpened = true;
    this.collabToEdit = {...collab};
    this.edit = true;
  }

  closeModal() {
    this.collabFormOpened =false;
  }

  ngOnInit() {
    this.collabService.getAllEtsCollaborateurs(this.etsId).subscribe(res => {
      console.log("liste collab: ",res.content);

      this.listCollabs = res.content;
    })
  }

}
