import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontSizeDirective } from './font-size.directive';
import { ScrollToDirective } from './scroll-to.directive';
import { AppDropdownDirective } from './dropdown.directive';
import { DropdownAnchorDirective } from './dropdown-anchor.directive';
import { DropdownLinkDirective } from './dropdown-link.directive';
import { WiproBankSideNavToggleDirective } from './WiproBank-side-nav-toggle.directive';
import { WiproBankSidenavHelperDirective, WiproBankSidenavTogglerDirective } from './WiproBank-sidenav-helper/WiproBank-sidenav-helper.directive';

const directives = [
  FontSizeDirective,
  ScrollToDirective,
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  WiproBankSideNavToggleDirective,
  WiproBankSidenavHelperDirective,
  WiproBankSidenavTogglerDirective,
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: directives,
  exports: directives
})
export class SharedDirectivesModule {}