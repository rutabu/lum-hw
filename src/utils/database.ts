import { Book } from '../books/interfaces';
import { sleep } from './helpers';
import { User, USER_ROLE_TYPE } from '../users/interfaces';

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

export async function getUsers(): Promise<User[] | undefined> {
  await sleep();
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

export async function updateUsersList(users: User[]) {
  await sleep();
  localStorage.setItem(DB_KEY_USERS, JSON.stringify(users));
  // update was successful
  return true;
}

export const populateDatabase = () => {
  if (!fetchItemFromLocalStorage(DB_KEY_BOOKS)) {
    const books: Book[] = [
      {
        id: 1,
        title: 'First book',
        author: 'John Smith',
        publishedDate: 2015,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1fatesfuries400.jpg',
        quantity: 5,
      },
      {
        id: 2,
        title: 'Second book',
        author: 'Jane Doe',
        publishedDate: 2019,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1waterknife400.jpg',
        quantity: 3,
      },
      {
        id: 3,
        title: 'Second book',
        author: 'Jane Doe',
        publishedDate: 2019,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1thelastpilot400.png',
        quantity: 3,
      },
      {
        id: 4,
        title: 'Third book',
        author: 'Mark Tomson',
        publishedDate: 2010,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1bookofnumbers400.jpg',
        quantity: 7,
      },
      {
        id: 5,
        title: 'City on Fire',
        author: 'Mark Tomson',
        publishedDate: 2010,
        bookCover: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015/large/1cityonfire400.jpg',
        quantity: 7,
      },
      {
        id: 6,
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
        id: 1,
        name: 'Jane',
        surname: 'Doe',
        username: 'admin',
        password: 'admin',
        role: USER_ROLE_TYPE.ADMIN,
      },
      {
        id: 2,
        name: 'John',
        surname: 'Doe',
        username: 'client',
        password: 'client',
        role: USER_ROLE_TYPE.CLIENT,
      },
    ];
    localStorage.setItem(DB_KEY_USERS, JSON.stringify(users));
  }
};
