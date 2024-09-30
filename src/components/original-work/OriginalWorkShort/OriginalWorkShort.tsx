import { OriginalWorkHoverCard } from '@components/original-work/OriginalWorkHoverCard';
import { OriginalWorkServerModel } from '@models/original-work';
import { Text } from '@radix-ui/themes';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { HStack, HstackProps, VStack } from 'styled-system/jsx';

interface Props extends HstackProps {
  originalWork: OriginalWorkServerModel;
}

export default function OriginalWorkShort({ originalWork, ...props }: Props) {
  const locale = useLocale();

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
                color: 'gray.500',
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
                lineHeight: '16.5px',
              })}
            >
              <Text
                weight="medium"
                className={css({
                  fontSize: '14px',
                  lineHeight: '16.5px',

                  cursor: 'pointer',
                  _hover: {
                    textDecoration: 'underline',
                  },
                })}
              >
                {locale === 'ko'
                  ? originalWork.title_in_kor
                  : originalWork.title_in_eng}
              </Text>
            </Link>
            <Link
              href={`/original-work/${originalWork.id}`}
              className={css({
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: '240px',
                lineHeight: '14px',
                color: 'gray.500',
              })}
            >
              <Text
                className={css({
                  fontSize: '11px',
                  color: 'gray.500',
                  lineHeight: '14px',

                  cursor: 'pointer',
                  _hover: {
                    textDecoration: 'underline',
                  },
                })}
                color="gray"
              >
                {originalWork.title}
              </Text>
            </Link>
          </VStack>
        </HStack>
      </OriginalWorkHoverCard.Trigger>
      <OriginalWorkHoverCard.Content originalWork={originalWork} side="top" />
    </OriginalWorkHoverCard.Root>
  );
}
