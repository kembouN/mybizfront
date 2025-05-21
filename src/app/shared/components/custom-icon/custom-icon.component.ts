import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-icon',
  imports: [],
  templateUrl: './custom-icon.component.html',
  styleUrl: './custom-icon.component.scss'
})
export class CustomIconComponent {

  id= input<string>();
  borderRadius= input<number>();
  class= input<string>();
  color= input<string>();
  title = input<string>();
  size = input<number>();
}
