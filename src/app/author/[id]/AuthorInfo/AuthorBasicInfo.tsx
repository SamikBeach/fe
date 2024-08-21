import { AuthorServerModel } from '@models/author';
import { HStack, VStack } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import { css } from 'styled-system/css';
import { HeartFilledIcon } from '@radix-ui/react-icons';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorInfo({ author }: Props) {
  const {
    name,
    image_url,
    born_date,
    died_date,
    born_date_is_bc,
    died_date_is_bc,
  } = author;

  return (
    <VStack alignItems="start" gap="20px" width="100%">
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
