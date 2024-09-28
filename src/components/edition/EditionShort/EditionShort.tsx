import { EditionHoverCard } from '@components/edition/EditionHoverCard';
import { EditionServerModel } from '@models/edition';
import { Text } from '@radix-ui/themes';
import Link from 'next/link';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { HStack, HstackProps, VStack } from 'styled-system/jsx';

interface Props extends HstackProps {
  edition: EditionServerModel;
}

export default function EditionShort({ edition, ...props }: Props) {
  return (
    <EditionHoverCard.Root>
      <EditionHoverCard.Trigger>
        <HStack gap="6px" {...props}>
          <Link href={`/edition/${edition.id}`}>
            <GiSecretBook
              className={css({
                display: 'inline',
                marginBottom: '2px',
                cursor: 'pointer',
                color: 'gray.600',
              })}
              size="24px"
            />
          </Link>{' '}
          <VStack gap="0" alignItems="start">
            <Link
              href={`/edition/${edition.id}`}
              className={css({
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: '240px',
              })}
            >
              <Text
                weight="medium"
                className={css({
                  fontSize: '14px',

                  cursor: 'pointer',
                  _hover: {
                    textDecoration: 'underline',
                  },
                })}
              >
                {edition.title}
              </Text>
            </Link>
          </VStack>
        </HStack>
      </EditionHoverCard.Trigger>
      <EditionHoverCard.Content edition={edition} side="top" />
    </EditionHoverCard.Root>
  );
}
