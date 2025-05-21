import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomInfoBubleComponent } from './shared/components/custom-info-buble/custom-info-buble.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomInfoBubleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MyBizCopilot';
}
