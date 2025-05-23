import { Component, inject, OnInit } from '@angular/core';
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
    this.entreprises = JSON.parse(localStorage.getItem("userEts") ?? "[]");
  }

  onSelectEnterprise(etsId: number) {
    localStorage.setItem("etsId", etsId.toString());
    this.router.navigate(['/client'])
  }
}
