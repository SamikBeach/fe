import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

export default function UserInfo() {
  return (
    <VStack gap="20px" width="260px" alignItems="start" pt="30px">
      <Avatar
        radius="full"
        fallback="B"
        size="9"
        className={css({
          width: '260px',
          height: '260px',
          margin: '0 auto',
        })}
      />
      <Text weight="bold" size="6">
        Bonggeun Jeong
      </Text>
    </VStack>
  );
}
