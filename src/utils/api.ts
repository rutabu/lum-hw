import { find, findIndex, pick } from 'lodash';
import { AuthUser, User } from '../users/interfaces';
import { sleep } from './helpers';
import { Book } from '../books/interfaces';
import { Order, ORDER_STATUS_TYPE, OrderBook } from '../orders/interfaces';
import { getBooksFromDB, getOrdersFromDB, getUsersFromDB } from './database';

export async function getBooks(): Promise<Book[]> {
  await sleep();
  return getBooksFromDB();
}

export async function getBooksWithRemovedBook(bookId: number): Promise<Book[]> {
  await sleep();
  const books = getBooksFromDB();

  const editableBookIndex = findIndex(books, { id: bookId });

  if (editableBookIndex === -1) {
    return books;
  }

  return [
    ...books.slice(0, editableBookIndex),
    ...books.slice(editableBookIndex + 1),
  ];
}

export async function getUsers(): Promise<User[]> {
  return getUsersFromDB();
}

export async function getUsersWithRemovedUser(userId: number): Promise<User[]> {
  await sleep();
  const users = getUsersFromDB();

  const editableUserIndex = findIndex(users, { id: userId });

  if (editableUserIndex === -1) {
    return users;
  }

  return [
    ...users.slice(0, editableUserIndex),
    ...users.slice(editableUserIndex + 1),
  ];
}

export async function getAuthUser(
  username: string,
  password: string,
): Promise<AuthUser | undefined> {
  await sleep();
  const users = getUsersFromDB();
  const user = find(users, { username, password });

  return user
    ? pick(user, ['id', 'name', 'surname', 'role']) as AuthUser
    : undefined;
}

export async function getOrders(): Promise<Order[]> {
  await sleep();

  return getOrdersFromDB();
}

function getUpdatedOrderBooksList(
  countOrdered: number,
  book: Book,
  orderBooks: OrderBook[],
): OrderBook[] {
  const orderBook: OrderBook = {
    ...book,
    countOrdered,
  };

  // first book in order
  if (orderBooks.length === 0) {
    return [
      { ...orderBook },
    ];
  }

  const editableOrderBookIndex = findIndex(orderBooks, { id: book.id });

  // new book in order
  if (editableOrderBookIndex === -1) {
    return [
      ...orderBooks,
      { ...orderBook },
    ];
  }

  // if count is 0 - remove book from the list
  if (countOrdered === 0) {
    return [
      ...orderBooks.slice(0, editableOrderBookIndex),
      ...orderBooks.slice(editableOrderBookIndex + 1),
    ];
  }

  // updating existing book count
  return [
    ...orderBooks.slice(0, editableOrderBookIndex),
    { ...orderBook },
    ...orderBooks.slice(editableOrderBookIndex + 1),
  ];
}

export async function getUpdatedOrders(
  count: number,
  book: Book,
  userId: number,
): Promise<Order[]> {
  await sleep();
  const orders = getOrdersFromDB();
  const editableUserOrderIndex = findIndex(orders, { userId, status: ORDER_STATUS_TYPE.NEW });
  const orderId = editableUserOrderIndex !== -1
    ? orders[editableUserOrderIndex].id
    : orders.length;
  const orderBooks = editableUserOrderIndex !== -1 ? orders[editableUserOrderIndex].books : [];
  const books = getUpdatedOrderBooksList(count, book, orderBooks);

  const newOrder: Order = {
    id: orderId,
    userId,
    status: ORDER_STATUS_TYPE.NEW,
    books,
  };

  // first order
  if (orders.length === 0) {
    return [
      { ...newOrder },
    ];
  }

  // append new order
  if (editableUserOrderIndex === -1) {
    return [
      ...orders,
      { ...newOrder },
    ];
  }

  // update existing one
  return [
    ...orders.slice(0, editableUserOrderIndex),
    { ...newOrder },
    ...orders.slice(editableUserOrderIndex + 1),
  ];
}

export async function getUpdatedStatusOrders(
  orderId: number,
  status: ORDER_STATUS_TYPE,
): Promise<Order[]> {
  await sleep();
  const orders = getOrdersFromDB();
  const editableUserOrderIndex = findIndex(orders, { id: orderId });

  const newOrder: Order = {
    ...orders[editableUserOrderIndex],
    status,
  };

  return [
    ...orders.slice(0, editableUserOrderIndex),
    { ...newOrder },
    ...orders.slice(editableUserOrderIndex + 1),
  ];
}
