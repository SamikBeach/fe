import EditionItemInner from '@components/edition/EditionItem/EditionItemInner';
import { EditionServerModel } from '@models/edition';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack, HstackProps } from 'styled-system/jsx';

interface Props extends HstackProps {
  edition: EditionServerModel;
  editionItemInnerProps?: Omit<
    ComponentProps<typeof EditionItemInner>,
    'edition'
  >;
}

export default function EditionItem({
  edition,
  editionItemInnerProps,
  ...props
}: Props) {
  const router = useRouter();

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
      {...props}
    >
      <EditionItemInner edition={edition} {...editionItemInnerProps} />
    </HStack>
  );
}
