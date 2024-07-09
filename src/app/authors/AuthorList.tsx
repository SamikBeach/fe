import { searchAuthors } from '@apis/author';
import { filterAtom } from '@atoms/filter';
import { AuthorCard } from '@components/AuthorCard';
import { Spinner } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { HStack, HstackProps, VStack } from 'styled-system/jsx';

interface Props extends HstackProps {}

function AuthorList(props: Props) {
  const selectedFilters = useAtomValue(filterAtom);

  const { data: authors = [], isLoading } = useQuery({
    queryKey: ['author', selectedFilters],
    queryFn: () =>
      searchAuthors({
        ...selectedFilters,
        take: 4,
      }),
    select: response => response.data.data,
    placeholderData: prev => prev,
  });

  return (
    <>
      {isLoading ? (
        <VStack height="calc(100vh - 128px)" justify="center">
          <Spinner size="3" />
        </VStack>
      ) : (
        <HStack py="30px" justify="center" {...props}>
          <div className={css({ width: '1460px', px: '20px' })}>
            <HStack flexWrap="wrap" justifyContent="start" gap="20px">
              {authors.map(author => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </HStack>
          </div>
        </HStack>
      )}
    </>
  );
}

export default AuthorList;
