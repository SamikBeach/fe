import { OriginalWorkHoverCard } from '@components/original_work/OriginalWorkHoverCard';
import { OriginalWorkServerModel } from '@models/original_work';
import { Text } from '@radix-ui/themes';
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
          <GiSecretBook
            className={css({
              display: 'inline',
              marginBottom: '2px',
              cursor: 'pointer',
              color: 'gray.600',
            })}
            size="24px"
          />{' '}
          <VStack gap="0" alignItems="start">
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
            <Text className={css({ fontSize: '12px' })} color="gray">
              {originalWork.title_in_eng}
            </Text>
          </VStack>
        </HStack>
      </OriginalWorkHoverCard.Trigger>
      <OriginalWorkHoverCard.Content originalWork={originalWork} side="top" />
    </OriginalWorkHoverCard.Root>
  );
}
