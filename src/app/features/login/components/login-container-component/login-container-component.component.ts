import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-container-component.component.html',
  styleUrls: ['./login-container-component.component.scss']
})
export class LoginContainerComponent {
  @Input() title: string = '';
  @Input() primaryButtonText: string = '';
  @Input() secondaryButtonText: string = '';
}
