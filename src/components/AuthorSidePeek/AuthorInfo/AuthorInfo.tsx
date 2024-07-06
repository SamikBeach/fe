import { AuthorServerModel } from '@models/author';
import { HStack } from 'styled-system/jsx';
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
