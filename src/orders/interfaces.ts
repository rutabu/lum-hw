export interface Order {
  id: number,
  userId: number,
  status: ORDER_STATUS_TYPE,
  books: OrderBookItem[],
}

export interface OrderBookItem {
  bookId: number,
  count: number
}

export enum ORDER_STATUS_TYPE {
  NEW ='new',
  PAID = 'paid',
  SENT = 'sent',
  CANCELED = 'canceled',
}
