import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-image',
  imports: [],
  templateUrl: './custom-image.component.html',
  styleUrl: './custom-image.component.scss'
})

export class CustomImageComponent {

  width= input<number>();
  height= input<number>();
  source = input<string>();
  alt= input<string>();
  borderRadius= input<number>();

}
