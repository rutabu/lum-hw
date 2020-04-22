import { Order, ORDER_STATUS_TYPE } from './interfaces';
import { OrdersState } from '../redux/state';

export function getNewOrder(orders: Order[]): Order | undefined {
  return orders.find(({ status }) => status === ORDER_STATUS_TYPE.NEW);
}

export function getOrderById(orders: Order[], orderId: string) {
  return orders.find((item) => item.id === parseInt(orderId, 10));
}

export function getShoppingCartCount(orders?: OrdersState): number {
  if (!orders || !orders.list || orders.list.length === 0) {
    return 0;
  }

  const order = getNewOrder(orders.list);

  if (!order) {
    return 0;
  }

  return order.books.reduce((total, book) => total + book.countOrdered, 0);
}
