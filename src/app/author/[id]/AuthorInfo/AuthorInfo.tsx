import { AuthorServerModel } from '@models/author';
import { VStack } from 'styled-system/jsx';
import AuthorBasicInfo from './AuthorBasicInfo';
import AuthorInfoDataList from './AuthorInfoDataList';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorInfo({ author }: Props) {
  return (
    <VStack gap="20px" alignItems="start" width="600px" padding="20px">
      <AuthorBasicInfo author={author} />
      <AuthorInfoDataList author={author} />
    </VStack>
  );
}
