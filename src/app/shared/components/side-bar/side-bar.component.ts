import { booleanAttribute, Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EntrepriseService } from '../../../enterprise/service/entreprise.service';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit{

  entrepriseService = inject(EntrepriseService);

  isAdmin!: boolean;
  isEnterprise!: boolean;
  userProfile!: string;
  userName = localStorage.getItem("userName");

  ngOnInit(): void {
    this.isAdmin = booleanAttribute(localStorage.getItem("admin"));
    this.isEnterprise = booleanAttribute(localStorage.getItem("enterprise"));
  }

}
