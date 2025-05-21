import { Component, input, linkedSignal, output } from '@angular/core';
import { CustomButtonComponent } from "../custom-button/custom-button.component";

@Component({
  selector: 'app-custom-modal',
  imports: [CustomButtonComponent],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss'
})
export class CustomModalComponent {

  isVisible = input.required<boolean>();
  isCentered = input.required<boolean>();
  modalTitle = input.required<string>();
  showChange = output<boolean>();
  close = output();
  _isVisible = linkedSignal(() => this.isVisible());

  // closeModal(){
  //   this._isVisible.set(false);
  // }

}
