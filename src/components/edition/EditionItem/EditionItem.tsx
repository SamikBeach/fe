import { EditionServerModel } from '@models/edition';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import EditionItemInner from './EditionItemInner';
import useProgressRouter from '@hooks/useProgressRouter';

interface Props {
  edition: EditionServerModel;
}

export default function EditionItem({ edition }: Props) {
  const router = useProgressRouter();

  return (
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
      onClick={() => router.push(`/edition/${edition.id}`)}
    >
      <EditionItemInner edition={edition} />
    </HStack>
  );
}
