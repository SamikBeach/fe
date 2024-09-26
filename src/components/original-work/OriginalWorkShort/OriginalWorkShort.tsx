import { OriginalWorkHoverCard } from '@components/original-work/OriginalWorkHoverCard';
import { OriginalWorkServerModel } from '@models/original-work';
import { Text } from '@radix-ui/themes';
import Link from 'next/link';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { HStack, HstackProps, VStack } from 'styled-system/jsx';

interface Props extends HstackProps {
  originalWork: OriginalWorkServerModel;
}

export default function OriginalWorkShort({ originalWork, ...props }: Props) {
  return (
    <OriginalWorkHoverCard.Root>
      <OriginalWorkHoverCard.Trigger>
        <HStack gap="6px" {...props}>
          <Link href={`/original-work/${originalWork.id}`}>
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
              href={`/original-work/${originalWork.id}`}
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
                {originalWork.title}
              </Text>
            </Link>
            <Link
              href={`/original-work/${originalWork.id}`}
              className={css({
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: '240px',
              })}
            >
              <Text
                className={css({
                  fontSize: '12px',

                  cursor: 'pointer',
                  _hover: {
                    textDecoration: 'underline',
                  },
                })}
                color="gray"
              >
                {originalWork.title_in_eng}
              </Text>
            </Link>
          </VStack>
        </HStack>
      </OriginalWorkHoverCard.Trigger>
      <OriginalWorkHoverCard.Content originalWork={originalWork} side="top" />
    </OriginalWorkHoverCard.Root>
  );
}
