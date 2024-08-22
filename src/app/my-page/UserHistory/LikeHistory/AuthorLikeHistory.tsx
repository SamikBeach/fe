import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { CategoryWrapper } from './styled-components';
import { HStack } from 'styled-system/jsx';
import {
  MOCK_AUTHOR,
  MOCK_AUTHOR2,
  MOCK_AUTHOR3,
  MOCK_AUTHOR4,
} from '@constants/mocks';
import { Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';

export default function AuthorLikeHistory() {
  return (
    <CategoryWrapper>
      <Text size="2" weight="medium">
        Authors
      </Text>
      <HStack gap="6px">
        {[MOCK_AUTHOR, MOCK_AUTHOR2, MOCK_AUTHOR3, MOCK_AUTHOR4].map(author => (
          <AuthorAvatar
            key={author.id}
            className={css({ cursor: 'pointer' })}
            author={author}
          />
        ))}
      </HStack>
    </CategoryWrapper>
  );
}
