import { booleanAttribute, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit{

  isAdmin!: boolean;
  isEnterprise!: boolean;
  userProfile!: string;

  ngOnInit(): void {
    this.isAdmin = booleanAttribute(localStorage.getItem("admin"));
    this.isEnterprise = booleanAttribute(localStorage.getItem("enterprise"));
  }

}
