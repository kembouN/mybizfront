import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { CustomModalComponent } from "../../../shared/components/custom-modal/custom-modal.component";
import { EntrepriseFormComponent } from "../../../enterprise/component/entreprise-form/entreprise-form.component";
import { EntrepriseService } from '../../../enterprise/service/entreprise.service';
import { AuthService } from '../../services/auth.service';
import { Enterprise } from '../../../enterprise/models/enterprise';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-enterprise',
  imports: [CustomModalComponent, EntrepriseFormComponent],
  templateUrl: './choose-enterprise.component.html',
  styleUrl: './choose-enterprise.component.scss'
})
export class ChooseEnterpriseComponent implements OnInit{

  entrepriseService = inject(EntrepriseService);
  authService = inject(AuthService);
  router = inject(Router);

  entreprises!: Enterprise[];

  enterpriseFormOpened = false;

  userId = numberAttribute(localStorage.getItem("userId"));
  closeEtsForm() {
    this.enterpriseFormOpened = false
  }

  openEtsForm() {
    this.enterpriseFormOpened = true;
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.loadEnterprises();
  }

  loadEnterprises(){
    this.entrepriseService.getAllEntreprise(this.userId).subscribe( res => {
      this.entreprises = res.content;
    });
  }

  onSelectEnterprise(ets: Enterprise) {
    localStorage.setItem("etsId", ets.entrepriseId.toString());
    localStorage.setItem("nomEts", ets.nom);
    this.router.navigate(['/client']);
  }
}
