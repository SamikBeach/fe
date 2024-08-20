import { WritingHoverCard } from '@components/WritingHoverCard';
import { WritingServerModel } from '@models/writing';
import { Text } from '@radix-ui/themes';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  writing: WritingServerModel;
  withName?: boolean;
}

export default function OriginalWorkAvatar({
  writing,
  withName = false,
}: Props) {
  return (
    <WritingHoverCard.Root>
      <WritingHoverCard.Trigger>
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
                {writing.title}
              </Text>
              <Text className={css({ fontSize: '12px' })} color="gray">
                {writing.title_in_eng}
              </Text>
            </VStack>
          )}
        </HStack>
      </WritingHoverCard.Trigger>
      <WritingHoverCard.Content writing={writing} side="top" />
    </WritingHoverCard.Root>
  );
}
