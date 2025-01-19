import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-container-component.component.html',
  styleUrls: ['./login-container-component.component.scss']
})
export class LoginContainerComponent {
  @Input() title: string = '';
  @Input() primaryButtonText: string = '';
  @Input() secondaryButtonText: string = '';
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  submit(){
    this.onSubmit.emit()
  }

  navigate(){
    this.onNavigate.emit()
  }
}
