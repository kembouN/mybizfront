import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' ;

export interface ToastMessage {
  type: ToastType,
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts = signal<ToastMessage[]>([]);

  show(message: string, type: ToastType, duration = 5000) {
    const toast: ToastMessage = {
      text: message,
      type: type
    };
    this.toasts.update((current) => [...current, toast]);

    setTimeout(() => {
      this.toasts.update((current) => current.filter((t) => t !== toast));
    }, duration);
  }
}
