import { EditionHoverCard } from '@components/edition/EditionHoverCard';
import { OriginalWorkHoverCard } from '@components/original-work/OriginalWorkHoverCard';
import { EditionServerModel } from '@models/edition';
import { Avatar, Text, Tooltip } from '@radix-ui/themes';
import Link from 'next/link';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { HStack, HstackProps, VStack } from 'styled-system/jsx';

interface Props extends HstackProps {
  edition: EditionServerModel;
}

export default function EditionShort({ edition, ...props }: Props) {
  return (
    <HStack gap="10px" {...props}>
      <Link href={`/edition/${edition.id}`}>
        <img
          src={edition.image_url ?? undefined}
          width="24px"
          className={css({ borderRadius: '4px' })}
        />
      </Link>{' '}
      <VStack gap="0" alignItems="start">
        <EditionHoverCard.Root>
          <EditionHoverCard.Trigger>
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
          </EditionHoverCard.Trigger>
          <EditionHoverCard.Content edition={edition} side="top" />
        </EditionHoverCard.Root>
        <span
          className={css({
            color: 'gray.500',
            fontSize: '11px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '240px',
          })}
        >
          {edition.original_works.map(originalWork => (
            <OriginalWorkHoverCard.Root key={originalWork.id}>
              <OriginalWorkHoverCard.Trigger>
                <span className={css({ mr: '4px' })}>
                  <GiSecretBook
                    className={css({
                      display: 'inline',
                      marginBottom: '2px',
                      cursor: 'pointer',
                      color: 'gray.500',
                      width: '14px',
                    })}
                    size="14px"
                  />{' '}
                  <Text
                    className={css({
                      cursor: 'pointer',

                      _hover: {
                        textDecoration: 'underline',
                      },
                    })}
                  >
                    {originalWork.title_in_kor}
                  </Text>
                </span>
              </OriginalWorkHoverCard.Trigger>
              <OriginalWorkHoverCard.Content
                originalWork={originalWork}
                side="top"
              />
            </OriginalWorkHoverCard.Root>
          ))}
        </span>
      </VStack>
    </HStack>
  );
}
