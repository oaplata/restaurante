import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [NavbarComponent],
	exports: [NavbarComponent],
	imports: [IonicModule]
})
export class ComponentsModule {}
