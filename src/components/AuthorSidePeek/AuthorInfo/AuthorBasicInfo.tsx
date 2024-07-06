import { AuthorServerModel } from '@models/author';
import { VStack } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import AuthorInfoDataList from './AuthorInfoDataList';

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
    <>
      <Avatar
        radius="full"
        src={image_url ?? undefined}
        fallback={name}
        size="9"
      />
      <VStack alignItems="start" gap="10px">
        <VStack alignItems="start" gap="2px">
          <Text size="6" weight="bold">
            {name}
          </Text>
          <Text size="4">{name_in_kor}</Text>
          <Text size="2" color="gray">
            {getBornAndDiedDateText({
              bornDate: born_date,
              diedDate: died_date,
              bornDateIsBc: born_date_is_bc === 1,
              diedDateIsBc: died_date_is_bc === 1,
            })}
          </Text>
        </VStack>
        <AuthorInfoDataList author={author} />
      </VStack>
    </>
  );
}
