import { Component, Input } from '@angular/core';

@Component({
  selector: 'navbarapp',
  templateUrl: 'navbar.html'
})
export class NavbarappComponent {
  @Input() title: string;
  constructor() {
  }

}
