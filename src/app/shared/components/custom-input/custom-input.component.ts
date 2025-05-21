import { Component, output, input, forwardRef, linkedSignal} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
  providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CustomInputComponent),
        multi: true,
      }
    ]
})
export class CustomInputComponent implements ControlValueAccessor{

  valeur : string = '';
  type = input.required<string>();
  name = input.required<string>();
  label= input<string>();
  labelSize = input<number>(1);
  icon = input<any>();
  required = input<boolean>();
  placeholder = input<string>();
  disabled = input<boolean>();
  errorMessage = input<string>();
  errorSize = input<number>(0.6);
  inputWidth = input.required<number>();
  inputHeight = input.required<number>();
  borderRadius = input<number>();
  onChange = output<any>();
  isDisable = linkedSignal(() => this.disabled())
  touche = output();

  writeValue(obj: any): void {
    this.valeur = obj || '';
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    this.touche = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisable.set(isDisabled);
    // throw new Error('Method not implemented.');
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valeur = input.value;
    this.onChange.emit(this.valeur); // Notifie Angular des modifications
  }
}
