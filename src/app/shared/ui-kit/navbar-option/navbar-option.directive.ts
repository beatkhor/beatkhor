import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[bk-navbar-option]'
})
export class NavbarOptionDirective {
  @HostBinding('class') class = 'bk-navbar-option';
}
