import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  imports: [],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.scss'
})
export class CustomDropdownComponent implements OnInit{

  @Input() id!: number;
  @Input() name!: string;
  @Input() values!: string[];
  @Input() defaultValue!: string;
  @Input() disabled!: boolean;
  @Input() title!: string;
  @Input() width!: number;
  @Input() height!: number;
  @Input() borderRadius!: number;

  ngOnInit(): void {
    this.values = [
      "homme",
      "femme",
      "garçon",
      "fille",
      "enfant"
    ]
  };

}
