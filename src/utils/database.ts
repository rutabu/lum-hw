import { Book } from '../books/interfaces';
import { AuthUser, User, USER_ROLE_TYPE } from '../users/interfaces';
import { Order } from '../orders/interfaces';

const DB_KEY_BOOKS = 'books';
const DB_KEY_USERS = 'users';
const DB_KEY_AUTH_USER = 'auth_user';
const DB_KEY_ORDERS = 'orders';

function fetchItemFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}

export function getBooksFromDB(): Book[] {
  const item = fetchItemFromLocalStorage(DB_KEY_BOOKS);

  if (!item) {
    return [];
  }

  const books: Book[] = JSON.parse(item);

  if (!books) {
    return [];
  }

  return books;
}

export function storeBooks(books: Book[]) {
  localStorage.setItem(DB_KEY_BOOKS, JSON.stringify(books));
}

export function getUsersFromDB(): User[] {
  const item = fetchItemFromLocalStorage(DB_KEY_USERS);

  if (!item) {
    return [];
  }

  const users: User[] = JSON.parse(item);

  if (!users) {
    return [];
  }

  return users;
}

export function storeUsers(users: User[]) {
  localStorage.setItem(DB_KEY_USERS, JSON.stringify(users));
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

export function getOrdersFromDB(): Order[] | [] {
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

export const populateDatabase = () => {
  if (!fetchItemFromLocalStorage(DB_KEY_BOOKS)) {
    const books: Book[] = [
      {
        id: 0,
        title: 'Fates and Furies',
        author: 'Lauren Groff',
        publishedDate: 2015,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1fatesfuries400.jpg',
        quantity: 5,
      },
      {
        id: 1,
        title: 'The Water Knife',
        author: 'Paolo Bacigalupi',
        publishedDate: 2019,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1waterknife400.jpg',
        quantity: 3,
      },
      {
        id: 2,
        title: 'The Last Pilot',
        author: 'Benjamin Johncock',
        publishedDate: 2019,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1thelastpilot400.png',
        quantity: 3,
      },
      {
        id: 3,
        title: 'Book of Numbers',
        author: 'Joshua Cohen',
        publishedDate: 2010,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1bookofnumbers400.jpg',
        quantity: 7,
      },
      {
        id: 4,
        title: 'City on Fire',
        author: 'Garth Risk Hallberg',
        publishedDate: 2010,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1cityonfire400.jpg',
        quantity: 2,
      },
      {
        id: 5,
        title: 'Speak',
        author: 'Louisa Hall',
        publishedDate: 2010,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1speak400.png',
        quantity: 10,
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
