import { find, findIndex, pick } from 'lodash';
import { Book } from '../books/interfaces';
import { sleep } from './helpers';
import { AuthUser, User, USER_ROLE_TYPE } from '../users/interfaces';
import { Order, ORDER_STATUS_TYPE, OrderBook } from '../orders/interfaces';

const DB_KEY_BOOKS = 'books';
const DB_KEY_USERS = 'users';
const DB_KEY_AUTH_USER = 'auth_user';
const DB_KEY_ORDERS = 'orders';

function fetchItemFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}

export async function getBooks(): Promise<Book[] | undefined> {
  await sleep();
  const item = fetchItemFromLocalStorage(DB_KEY_BOOKS);

  if (!item) {
    return undefined;
  }

  const books: Book[] = JSON.parse(item);

  if (!books) {
    return undefined;
  }

  return books;
}

export async function updateBooksList(books: Book[]) {
  await sleep();
  localStorage.setItem(DB_KEY_BOOKS, JSON.stringify(books));
  // update was successful
  return true;
}

function getUsersFromDB(): User[] | undefined {
  const item = fetchItemFromLocalStorage(DB_KEY_USERS);

  if (!item) {
    return undefined;
  }

  const users: User[] = JSON.parse(item);

  if (!users) {
    return undefined;
  }

  return users;
}

export async function getUsers(): Promise<User[] | undefined> {
  return getUsersFromDB();
}

export async function getAuthUser(
  username: string,
  password: string,
): Promise<AuthUser | undefined> {
  const users = getUsersFromDB();
  const user = find(users, { username, password });
  await sleep();

  return user
    ? pick(user, ['id', 'name', 'surname', 'role']) as AuthUser
    : undefined;
}

export function getLoggedInAuthUser(): AuthUser | undefined {
  const item = fetchItemFromLocalStorage(DB_KEY_AUTH_USER);

  if (!item) {
    return undefined;
  }

  const authUsers: AuthUser = JSON.parse(item);

  if (!authUsers) {
    return undefined;
  }

  return authUsers;
}

export function storeAuthUser(user: AuthUser) {
  localStorage.setItem(DB_KEY_AUTH_USER, JSON.stringify(user));
}

export function removeStoredAuthUser() {
  localStorage.removeItem(DB_KEY_AUTH_USER);
}

export async function updateUsersList(users: User[]) {
  await sleep();
  localStorage.setItem(DB_KEY_USERS, JSON.stringify(users));
  // update was successful
  return true;
}

function getOrdersFromDB(): Order[] | [] {
  const item = fetchItemFromLocalStorage(DB_KEY_ORDERS);

  if (!item) {
    return [];
  }

  const orders: Order[] = JSON.parse(item);

  if (!orders) {
    return [];
  }

  return orders;
}

export function storeOrders(orders?: Order[]) {
  localStorage.setItem(DB_KEY_ORDERS, JSON.stringify(orders));
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
  const orders = getOrdersFromDB();
  const editableUserOrderIndex = findIndex(orders, { id: orderId });

  const newOrder: Order = {
    ...orders[editableUserOrderIndex],
    status,
  };

  await sleep();

  return [
    ...orders.slice(0, editableUserOrderIndex),
    { ...newOrder },
    ...orders.slice(editableUserOrderIndex + 1),
  ];
}

export const populateDatabase = () => {
  if (!fetchItemFromLocalStorage(DB_KEY_BOOKS)) {
    const books: Book[] = [
      {
        id: 0,
        title: 'First book',
        author: 'John Smith',
        publishedDate: 2015,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1fatesfuries400.jpg',
        quantity: 5,
      },
      {
        id: 1,
        title: 'Second book',
        author: 'Jane Doe',
        publishedDate: 2019,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1waterknife400.jpg',
        quantity: 3,
      },
      {
        id: 2,
        title: 'Second book',
        author: 'Jane Doe',
        publishedDate: 2019,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1thelastpilot400.png',
        quantity: 3,
      },
      {
        id: 3,
        title: 'Third book',
        author: 'Mark Tomson',
        publishedDate: 2010,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1bookofnumbers400.jpg',
        quantity: 7,
      },
      {
        id: 4,
        title: 'City on Fire',
        author: 'Mark Tomson',
        publishedDate: 2010,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1cityonfire400.jpg',
        quantity: 7,
      },
      {
        id: 5,
        title: 'Speak',
        author: 'Louisa Hall',
        publishedDate: 2010,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1speak400.png',
        quantity: 7,
      },
    ];
    localStorage.setItem(DB_KEY_BOOKS, JSON.stringify(books));
  }

  if (!fetchItemFromLocalStorage(DB_KEY_USERS)) {
    const users: User[] = [
      {
        id: 0,
        name: 'Jane',
        surname: 'Doe',
        username: 'admin',
        password: 'admin',
        role: USER_ROLE_TYPE.ADMIN,
      },
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        username: 'client1',
        password: 'client1',
        role: USER_ROLE_TYPE.CLIENT,
      },
      {
        id: 2,
        name: 'Kate',
        surname: 'Green',
        username: 'client2',
        password: 'client2',
        role: USER_ROLE_TYPE.CLIENT,
      },
    ];
    localStorage.setItem(DB_KEY_USERS, JSON.stringify(users));
  }
};
