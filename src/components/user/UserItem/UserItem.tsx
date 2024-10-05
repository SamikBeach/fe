import { UserServerModel } from '@models/user';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import UserItemInner from './UserItemInner';
import { useRouter } from 'next/navigation';

interface Props {
  user: UserServerModel;
}

export default function UserItem({ user }: Props) {
  const router = useRouter();

  return (
    <HStack
      border="1px solid"
      borderColor="gray.200"
      padding="16px"
      borderRadius="8px"
      width="386px"
      height="130px"
      className={css({ cursor: 'pointer' })}
      _hover={{ scale: 1.02, bgColor: 'gray.50' }}
      transition="scale 0.1s ease-in-out"
      onClick={() => router.push(`/user/${user.id}`)}
    >
      <UserItemInner user={user} />
    </HStack>
  );
}
