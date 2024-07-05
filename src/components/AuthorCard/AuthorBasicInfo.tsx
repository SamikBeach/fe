import { AuthorServerModel } from '@models/author';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorBasicInfo({ author }: Props) {
  const router = useRouter();

  const {
    name,
    name_in_kor,
    born_date,
    died_date,
    born_date_is_bc,
    died_date_is_bc,
    writings = [],
    books = [],
  } = author;

  return (
    <HStack alignItems="start" gap="20px">
      <Avatar
        src={author.image_url ?? undefined}
        fallback="폴백"
        radius="full"
        size="7"
        className={css({ cursor: 'pointer' })}
        onClick={() => router.push(`/author/${author.id}`)}
      />
      <VStack alignItems="start" gap="0" width="100%">
        <HStack width="100%">
          <Link href={`/author/${author.id}`}>
            <Text
              size="4"
              weight="bold"
              className={css({
                cursor: 'pointer',
                _hover: { textDecoration: 'underline' },
              })}
            >
              {name}
            </Text>
          </Link>
        </HStack>
        <Link href={`/author/${author.id}`}>
          <Text
            size="2"
            color="gray"
            className={css({
              cursor: 'pointer',
              _hover: { textDecoration: 'underline' },
            })}
          >
            {name_in_kor}
          </Text>
        </Link>
        <Text size="2" color="gray">
          {getBornAndDiedDateText({
            bornDate: born_date,
            diedDate: died_date,
            bornDateIsBc: born_date_is_bc === 1,
            diedDateIsBc: died_date_is_bc === 1,
          })}
        </Text>
        <HStack ml="2px">
          <Link href={`/author/${author.id}#writings`}>
            <Text
              size="2"
              className={css({
                color: 'gray.600',
                cursor: 'pointer',
                _hover: { textDecoration: 'underline' },
              })}
            >
              {writings.length} writings
            </Text>
          </Link>
          <Link href={`/author/${author.id}#books`}>
            <Text
              size="2"
              className={css({
                color: 'gray.600',
                cursor: 'pointer',
                _hover: { textDecoration: 'underline' },
              })}
            >
              {books.length} books
            </Text>
          </Link>
        </HStack>
      </VStack>
    </HStack>
  );
}
