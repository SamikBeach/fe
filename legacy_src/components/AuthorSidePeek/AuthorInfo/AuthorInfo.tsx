import { AuthorServerModel } from 'legacy_src/models/author';
import { HstackProps, VStack } from 'styled-system/jsx';
import AuthorBasicInfo from './AuthorBasicInfo';
import AuthorInfoDataList from './AuthorInfoDataList';
import { ScrollArea } from '@radix-ui/themes';
import { css } from 'styled-system/css';

interface Props extends HstackProps {
  author: AuthorServerModel;
}

export default function AuthorInfo({ author, ...props }: Props) {
  return (
    <VStack
      alignItems="start"
      height="100%"
      width="240px"
      pl="20px"
      pr="10px"
      {...props}
    >
      <AuthorBasicInfo author={author} />
      <ScrollArea
        className={css({
          height: '100%',
          width: '240px',
          paddingRight: '10px',
        })}
      >
        <AuthorInfoDataList author={author} />
      </ScrollArea>
    </VStack>
  );
}
