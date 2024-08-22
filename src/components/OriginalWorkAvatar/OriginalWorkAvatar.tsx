import { OriginalWorkHoverCard } from '@components/OriginalWorkHoverCard';
import { OriginalWorkServerModel } from '@models/original_work';
import { Text } from '@radix-ui/themes';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  originalWork: OriginalWorkServerModel;
  withName?: boolean;
}

export default function OriginalWorkAvatar({
  originalWork,
  withName = false,
}: Props) {
  return (
    <OriginalWorkHoverCard.Root>
      <OriginalWorkHoverCard.Trigger>
        <HStack gap="6px">
          <GiSecretBook
            className={css({
              display: 'inline',
              marginBottom: '2px',
              cursor: 'pointer',
              color: 'gray.600',
            })}
            size="24px"
          />{' '}
          {withName && (
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
          )}
        </HStack>
      </OriginalWorkHoverCard.Trigger>
      <OriginalWorkHoverCard.Content originalWork={originalWork} side="top" />
    </OriginalWorkHoverCard.Root>
  );
}
