import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar';
import { IonicModule } from 'ionic-angular';
import { BillComponent } from './bill/bill';

@NgModule({
	declarations: [NavbarComponent,
		BillComponent],
	exports: [NavbarComponent,
		BillComponent],
	imports: [IonicModule]
})
export class ComponentsModule { }
