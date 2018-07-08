import { Order, CoffeeInterfacePublic } from '../models/order';

export class PlaceOrderService implements CoffeeInterfacePublic {
    constructor() {
    }

    getAvailableItems() {
        const menuItems = [ 'Latte', 'Mocha', 'Cappuccinno'];
        return menuItems;
    }

    submitOrder(order: Order) {
        return null;
    }

}
