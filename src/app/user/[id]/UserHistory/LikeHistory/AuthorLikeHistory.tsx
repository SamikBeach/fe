import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { CategoryWrapper } from '../styled-components';
import { HStack } from 'styled-system/jsx';

import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { getUserLikes } from '@apis/user';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

export default function AuthorLikeHistory() {
  const t = useTranslations('Common');
  const params = useParams();
  const userId = Number(params.id);

  const { data, isLoading } = useQuery({
    queryKey: ['user/like', userId],
    queryFn: () => getUserLikes({ userId }),
    select: response => response.data,
    refetchOnMount: 'always',
  });

  const authors = data?.authors ?? [];

  return (
    <CategoryWrapper>
      <Text size="2" weight="medium">
        {t('authors')}
      </Text>
      <HStack gap="6px">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <Avatar key={index} size="2" radius="full" fallback="" />
              ))
          : authors.map(author => (
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
