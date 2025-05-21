import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-custom-info-buble',
  imports: [],
  templateUrl: './custom-info-buble.component.html',
  styleUrl: './custom-info-buble.component.scss'
})
export class CustomInfoBubleComponent {

  constructor(public toastService: ToastService){}

}
