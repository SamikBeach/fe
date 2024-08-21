import { AuthorServerModel } from '@models/author';
import { VStack } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import { css } from 'styled-system/css';

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
      </VStack>
    </VStack>
  );
}
