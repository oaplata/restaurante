import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar';
import { IonicModule } from 'ionic-angular';
import { BillComponent } from './bill/bill';
import { TranslatePipe } from '../pipes/translate/translate';

@NgModule({
	declarations: [NavbarComponent, TranslatePipe,
		BillComponent],
	exports: [NavbarComponent,
		BillComponent],
	imports: [IonicModule]
})
export class ComponentsModule { }
