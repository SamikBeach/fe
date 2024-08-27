import { AuthorServerModel } from '@models/author';
import { HStack, VStack } from 'styled-system/jsx';
import { Avatar, Button, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import { css } from 'styled-system/css';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import { addAuthorLike, removeAuthorLike } from '@apis/author';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorInfo({ author }: Props) {
  const {
    id,
    name,
    image_url,
    born_date,
    died_date,
    born_date_is_bc,
    died_date_is_bc,
  } = author;

  const { mutate } = useMutation({
    mutationFn: () => addAuthorLike({ authorId: id, userId: 1 }),
  });

  const { mutate: remove } = useMutation({
    mutationFn: () => removeAuthorLike({ authorId: id, userId: 1 }),
  });

  return (
    <VStack alignItems="start" gap="20px" width="100%">
      <Button onClick={() => mutate()}>like</Button>
      <Button onClick={() => remove()}>remove</Button>
      <VStack position="relative" width="100%">
        <Avatar
          radius="full"
          src={image_url ?? undefined}
          fallback={name}
          size="9"
          className={css({
            width: '260px',
            height: '260px',
            margin: '0 auto',
          })}
        />
        <HeartFilledIcon
          color="pink"
          width="40px"
          height="40px"
          className={css({
            zIndex: 2,
            position: 'absolute',
            right: '70px',
            bottom: '30px',
          })}
        />
      </VStack>
      <VStack alignItems="start" gap="2px">
        <Text size="6" weight="bold">
          {name}
        </Text>
        <Text size="3">
          {getBornAndDiedDateText({
            bornDate: born_date,
            diedDate: died_date,
            bornDateIsBc: born_date_is_bc === 1,
            diedDateIsBc: died_date_is_bc === 1,
          })}
        </Text>
        <HStack gap="2px">
          <Text>444</Text>
          <HeartFilledIcon color="pink" />
        </HStack>
      </VStack>
    </VStack>
  );
}
