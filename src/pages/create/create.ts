import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Order } from '../../interfaces/order';
import { Plate } from '../../interfaces/plate';
import { AuthProvider } from '../../providers/auth/auth';
import { OrderProvider } from '../../providers/order/order';

@IonicPage()
@Component({
    selector: 'page-create',
    templateUrl: 'create.html',
})
export class CreatePage {
    public typeOrder: string = 'mesa';
    public adressOrder: string;
    public tableOrder: string;
    public amountPlate: number;
    public plateOrder: Plate;
    public descriptionPlate: string;
    public isEditing: boolean = false;

    private order: Order;
    private plates: Plate[];
    private user;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private authProvider: AuthProvider,
        private orderProvider: OrderProvider,
        private alertCtrl: AlertController,
        private storage: Storage) {
        this.plates = [{
            name: "carne",
            value: 8000,
            amount: 0,
            description: ''
        },
        {
            name: "pechuga",
            value: 8000,
            amount: 0,
            description: ''
        },
        {
            name: "pernil",
            value: 8000,
            amount: 0,
            description: ''
        }]
    }

    getOrder(): Order {
        return this.order;
    }

    getPlates(): Plate[] {
        return this.plates;
    }

    addPlateToOder(): void {
        const plate: Plate = {
            amount: this.amountPlate,
            description: this.descriptionPlate || '',
            name: this.plateOrder.name,
            value: this.plateOrder.value
        };
        if (!this.order) return this.createOrder(plate);

        this.order.plates.push(plate);
        this.clearPlate();
    }

    createOrder(plate: Plate) {
        this.order = {
            address: this.adressOrder,
            id: `${Date.now()}`,
            plates: [plate],
            table: this.tableOrder,
            type: this.typeOrder,
            user: 'uid',
            state: 'active'
        };

        this.clearPlate();
    }

    clearPlate(): void {
        this.amountPlate = null;
        this.descriptionPlate = null;
        this.plateOrder = null;
    }

    async saveOrder(): Promise<void> {
        this.order.type === 'mesa' ? delete this.order.address : delete this.order.table;
        this.order.user = this.user.uid;
        let created;
        if (this.isEditing) {
            created = await this.orderProvider.updateOrder(this.order).catch(err => console.log(err));
        } else {
            this.order.id = `${Date.now()}`;
            created = await this.orderProvider.saveOrder(this.order).catch(err => console.log(err));
        }
        this.adressOrder = null;
        this.tableOrder = null;
        this.amountPlate =  null;
        this.plateOrder = null;
        this.descriptionPlate = null;
        this.order = null;
        this.notifyOrderCreateEvent(created);
    }

    notifyOrderCreateEvent(result) {
        let message: string;
        if (result) {
            message = 'Orden creada con exito';
        } else {
            message = 'Esta orden no pudo ser creada por favor intente de nuevo'
        }
        const alert = this.alertCtrl.create({
            message,
            buttons: ['Ok']
        });

        alert.present();

        alert.onDidDismiss(() => {
            if (result) {
                this.navCtrl.parent.select(0);
            }
        });
    }

    removePlateOfOrder(plate: Plate): void {
        const index = this.order.plates.findIndex(p => p === plate);
        this.order.plates.splice(index, 1);
        if (!this.order.plates.length) {
            this.order = null;
        }
    }

    async ionViewWillEnter(){
        this.user = await this.authProvider.getSesion().catch(err => console.log(err));
        if (!this.user) {
            this.navCtrl.setRoot('page-login');
        }

        this.isEditing = false;
        await this.storage.ready();
        const order = await this.storage.get('order');

        if (order) {
            this.order = order;
            await this.storage.remove('order');
            this.typeOrder = this.order.type;
            this.adressOrder = this.order.address || '';
            this.tableOrder = this.order.table || '';
            this.isEditing = true;
        }
    }

}
