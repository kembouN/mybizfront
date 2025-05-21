import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { CustomModalComponent } from "../../../shared/components/custom-modal/custom-modal.component";
import { EntrepriseFormComponent } from "../entreprise-form/entreprise-form.component";
import { EntrepriseService } from '../../service/entreprise.service';
import { Enterprise } from '../../models/enterprise';
import { CustomIconComponent } from "../../../shared/components/custom-icon/custom-icon.component";

@Component({
  selector: 'app-entreprise',
  imports: [SideBarComponent, CustomModalComponent, EntrepriseFormComponent, CustomIconComponent],
  templateUrl: './entreprise.component.html',
  styleUrl: './entreprise.component.scss'
})
export class EntrepriseComponent implements OnInit{

  entrepriseService = inject(EntrepriseService);

  entrepriseFormOpened = false;

  nomUtilisateur = localStorage.getItem("userName");
  idUser = numberAttribute(localStorage.getItem("userId"));
  listeEts!: Enterprise[];




  ngOnInit() {
    return this.entrepriseService.getAllEntreprise(this.idUser).subscribe(res =>{
      this.listeEts = res.content;
    });
  }

  openEntrepriseForm(){
    this.entrepriseFormOpened= true;
  }

  closeEntrepriseForm(){
    this.entrepriseFormOpened= false;
  }
}
