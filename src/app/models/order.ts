export class Order {
    // To be filled in
    name: string;
    phoneNumber?: string;
    email?: string;
    orderId?: number;
    orderTime: string;   // order time is stored as epoch
    orderStatus: string;
    orderItems: Array<string>;
}

export interface CoffeeInterfacePublic {
    submitOrder(order: Order);              // Sends an order to the server
    getAvailableItems(): Array<string>;     // Retrieves a list of the items available for ordering
}

export interface CoffeeInterfacePrivate {
    getOrders(): Array<Order>;              // Returns a list of all orders currently in the system
    getOrder(orderId: number): Order;       // Returns the details of a specific order for viewing
    orderReady(orderId: number);            // Marks an order as ready for pick-up
}
