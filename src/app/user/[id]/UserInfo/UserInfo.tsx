import { getUserInfoById } from '@apis/user';
import { Avatar, Skeleton, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

export default function UserInfo() {
  const params = useParams();
  const userId = Number(params.id);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', params.id],
    queryFn: () => getUserInfoById({ userId }),
    select: response => response.data,
  });

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
      {isLoading ? (
        <Skeleton height="24px" width="140px" />
      ) : (
        <Text weight="bold" size="6">
          {user?.name}
        </Text>
      )}
    </VStack>
  );
}
