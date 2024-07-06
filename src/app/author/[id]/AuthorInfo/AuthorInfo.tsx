import { AuthorServerModel } from '@models/author';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import { HStack, VStack } from 'styled-system/jsx';
import AuthorInfoDataList from './AuthorInfoDataList';
import AuthorBasicInfo from './AuthorBasicInfo';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorInfo({ author }: Props) {
  return (
    <HStack gap="40px" alignItems="start" width="100%">
      <AuthorBasicInfo author={author} />
    </HStack>
  );
}
