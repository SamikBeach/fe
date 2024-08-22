import { AuthorServerModel } from 'legacy_src/models/author';
import { VStack } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from 'legacy_src/utils/author';
import { css } from 'styled-system/css';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorInfo({ author }: Props) {
  const {
    name,
    name_in_kor,
    image_url,
    born_date,
    died_date,
    born_date_is_bc,
    died_date_is_bc,
  } = author;

  return (
    <VStack alignItems="start" gap="10px" width="100%" pt="10px">
      <Avatar
        radius="full"
        src={image_url ?? undefined}
        fallback={name}
        className={css({
          width: '180px',
          height: '180px',
          margin: '0 auto',
        })}
      />
      <VStack alignItems="start" gap="0px">
        <Text size="4" weight="bold">
          {name}
        </Text>
        <Text size="3">{name_in_kor}</Text>
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
