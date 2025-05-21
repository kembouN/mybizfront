import { Component, input, output} from '@angular/core';

@Component({
  selector: 'app-custom-button',
  imports: [],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {

  id = input<string>("modal-close-button")
  text = input<string>();
  textSize = input<number>();
  disabled = input<boolean>();
  width = input<number>();
  height = input<number>();
  left = input<number>();
  rigth = input<number>();
  bottom = input<number>();
  top = input<number>();
  type = input.required<string>();
  color = input<string>();
  borderRadius = input<number>();
  onClick = output();
  onHover = output();

}
