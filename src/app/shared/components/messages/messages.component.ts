import { Component, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { FormsModule } from '@angular/forms';
import { MessageRequest } from '../../models/messages';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-messages',
  imports: [FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {

  messageService = inject(MessagesService);
  toast = inject(ToastService);

  receivers = input.required<number[]>();
  typeMessage = "TEXT";
  initialForm: MessageRequest = {
    message: "",
    fileName: "",
    caption: "",
    receivers: []
  }

  ngOnInit(): void {
    this.initialForm.receivers = this.receivers();
  }

  sendMessage() {
    console.log(this.initialForm);

    this.messageService.sendMessage(this.initialForm).subscribe({
      next: res => {
        this.toast.show(res.message, 'success');
        document.getElementById("modal-close-button")?.click();
      },
      error: err => {
        this.toast.show(err.error.message, 'error');
      }
    });
  }

}
