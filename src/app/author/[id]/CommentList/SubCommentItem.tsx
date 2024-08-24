import { HStack, VStack, styled } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';

export default function SubCommentItem() {
  return (
    <HStack alignItems="start" ml="60px">
      <Avatar fallback="B" radius="full" size="2" mt="4px" />
      <VStack gap="4px" alignItems="start">
        <CommentBox>
          <Text weight="medium" className={css({ display: 'block' })}>
            Bonggeun Jeong{' '}
            <span
              className={css({
                fontSize: '12px',
                fontWeight: 'normal',
                color: 'gray',
              })}
            >
              2 months ago
            </span>
          </Text>
          Ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit,
          vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo
          lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend
        </CommentBox>
        <HStack justify="space-between" width="100%">
          <HStack ml="8px">
            <Text
              weight="medium"
              color="gray"
              size="1"
              className={css({ cursor: 'pointer' })}
            >
              Like
            </Text>
            <Text
              weight="medium"
              color="gray"
              size="1"
              className={css({ cursor: 'pointer' })}
            >
              Comment
            </Text>
          </HStack>
          <Text
            weight="medium"
            color="gray"
            size="1"
            className={css({ cursor: 'pointer' })}
            mr="8px"
          >
            334 likes
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}

const CommentBox = styled('div', {
  base: {
    padding: '10px',
    bgColor: 'gray.100',
    borderRadius: '6px',
  },
});
