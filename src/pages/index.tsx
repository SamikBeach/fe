import Button from '@components/Button';
import axios, { AxiosError } from 'axios';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { jwtAtom } from 'src/atoms';
import { userIdAtom } from 'src/atoms/user';
import { css } from 'styled-system/css';

interface User {
  id: string;
  email: string;
  name: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  yearOfPublication: number;
  salesQuantity: number;
}

export default function Page() {
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [booksByAuthor, setBooksByAuthor] = useState<Book[]>([]);

  const jwt = useAtomValue(jwtAtom);
  const userId = useAtomValue(userIdAtom);

  const router = useRouter();

  const { data: user } = useQuery<
    {
      data: User;
    },
    AxiosError,
    User
  >(
    'user',
    async () =>
      axios.get(`http://localhost:3001/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
    { enabled: isUserInfoVisible, select: data => data.data }
  );

  const { data: books = [] } = useQuery<
    {
      data: Book[];
    },
    AxiosError,
    Book[]
  >(
    'book',
    async () =>
      axios.get('http://localhost:3001/book', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
    { select: data => data.data }
  );

  const fetchBooksByAuthor = async (author: string) => {
    return await axios.get('http://localhost:3001/book', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        author,
      },
    });
  };

  useEffect(() => {
    if (jwt === '') {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <h1>Main page</h1>
      <Button
        color="gray"
        onClick={() => setIsUserInfoVisible(!isUserInfoVisible)}
      >
        {isUserInfoVisible ? 'Hide User Info' : 'Show User Info'}
      </Button>
      {isUserInfoVisible && (
        <div className={css({ my: '5' })}>
          <h2>
            <b>User Info</b>
          </h2>
          <p>
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Email:</b> {user?.email}
          </p>
          <p>
            <b>Id:</b> {user?.id}
          </p>
        </div>
      )}
      <div className={css({ display: 'flex' })}>
        {books.map(book => (
          <div key={book.id} className={css({ marginRight: '10' })}>
            <div className={css({ fontWeight: 'bold' })}>{book.id}</div>
            <div className={css({ fontWeight: 'bold' })}>{book.title}</div>
            <div
              onClick={async () => {
                const { data } = await fetchBooksByAuthor(book.author);

                setBooksByAuthor(data);

                setSelectedAuthor(book.author);
              }}
              className={css({ cursor: 'pointer' })}
            >
              {book.author}
            </div>
            <div>{book.publisher}</div>
            <div>{book.yearOfPublication}</div>
            <div>{book.salesQuantity}</div>
          </div>
        ))}
      </div>
      <div>
        <h2>Books by author</h2>
        <h2>{selectedAuthor}</h2>
        <div className={css({ display: 'flex' })}>
          {booksByAuthor.map(book => (
            <div key={book.id} className={css({ marginRight: '10' })}>
              <div className={css({ fontWeight: 'bold' })}>{book.id}</div>
              <div className={css({ fontWeight: 'bold' })}>{book.title}</div>
              <div>{book.author}</div>
              <div>{book.publisher}</div>
              <div>{book.yearOfPublication}</div>
              <div>{book.salesQuantity}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
