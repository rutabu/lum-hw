import { Book } from '../books/interfaces';

export interface Order {
  id: number,
  userId: number,
  status: ORDER_STATUS_TYPE,
  books: OrderBook[],
}

export interface OrderBook extends Book {
  countOrdered: number,
}

export enum ORDER_STATUS_TYPE {
  NEW ='new',
  PAID = 'paid',
  SENT = 'sent',
  CANCELED = 'canceled',
}
