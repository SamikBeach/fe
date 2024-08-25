import { AuthorServerModel } from '@models/author';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import AuthorItemInner from './AuthorItemInner';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorItem({ author }: Props) {
  return (
    <Link href={`/author/${author.id}`}>
      <HStack
        border="1px solid"
        borderColor="gray.200"
        padding="16px"
        borderRadius="8px"
        width="386px"
        height="130px"
        className={css({ cursor: 'pointer' })}
        _hover={{ scale: 1.02, bgColor: 'gray.50' }}
        transition="scale 0.1s ease-in-out"
      >
        <AuthorItemInner author={author} />
      </HStack>
    </Link>
  );
}
