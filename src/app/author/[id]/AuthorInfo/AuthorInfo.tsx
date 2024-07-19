import { AuthorServerModel } from '@models/author';
import { HstackProps, VStack } from 'styled-system/jsx';
import AuthorBasicInfo from './AuthorBasicInfo';
import AuthorInfoDataList from './AuthorInfoDataList';

interface Props extends HstackProps {
  author: AuthorServerModel;
}

export default function AuthorInfo({ author, ...props }: Props) {
  return (
    <VStack gap="20px" alignItems="start" px="20px" {...props}>
      <AuthorBasicInfo author={author} />
      <AuthorInfoDataList author={author} />
    </VStack>
  );
}
