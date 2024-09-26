import { AuthorAvatar } from '@components/author/AuthorAvatar';

import { css } from 'styled-system/css';
import { VStack, styled } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { OriginalWorkShort } from '@components/original-work/OriginalWorkShort';
import { useQuery } from '@tanstack/react-query';
import { getTrendingAuthors } from '@apis/author';
import { getTrendingOriginalWorks } from '@apis/original-work';
import RightSideSkeleton from './RightSideSkeleton';

export default function RightSide() {
  const { data: trendingAuthors = [], isLoading: isLoadingTrendingAuthors } =
    useQuery({
      queryKey: ['author/trending'],
      queryFn: getTrendingAuthors,
      select: response => response.data,
      refetchOnMount: 'always',
    });

  const {
    data: trendingOriginalWorks = [],
    isLoading: isLoadingTrendingOriginalWorks,
  } = useQuery({
    queryKey: ['original-work/trending'],
    queryFn: getTrendingOriginalWorks,
    select: response => response.data,
    refetchOnMount: 'always',
  });

  return (
    <VStack minWidth="300px" position="sticky" top="0" pt="84px">
      <VStack gap="8px" width="100%" alignItems="start">
        <Text className={css({ fontWeight: 'medium' })}>Trending Now</Text>
        {isLoadingTrendingAuthors ? (
          <RightSideSkeleton />
        ) : (
          <Section>
            <Text>Authors</Text>
            {trendingAuthors.slice(0, 5).map(author => (
              <AuthorAvatar key={author.id} author={author} withName />
            ))}
          </Section>
        )}
        {isLoadingTrendingOriginalWorks ? (
          <RightSideSkeleton />
        ) : (
          <Section className={css({ gap: '2px' })}>
            <Text>Original works</Text>
            {trendingOriginalWorks.slice(0, 5).map(originalWork => (
              <OriginalWorkShort
                key={originalWork.id}
                originalWork={originalWork}
              />
            ))}
          </Section>
        )}
      </VStack>
    </VStack>
  );
}

// function EditionItem({ title }: { title: string }) {
//   return (
//     <HStack gap="6px">
//       <GiBlackBook
//         className={css({
//           display: 'inline',
//           cursor: 'pointer',
//           color: 'gray.600',
//         })}
//         size="24px"
//       />
//       <BoldText>{title}</BoldText>
//     </HStack>
//   );
// }

const Section = styled(VStack, {
  base: {
    alignItems: 'start',
    gap: '6px',
    width: '100%',
    bgColor: 'gray.100',
    fontSize: '14px',
    fontWeight: 'medium',
    borderRadius: '8px',
    px: '14px',
    py: '10px',
  },
});

// const BoldText = styled('span', {
//   base: {
//     fontWeight: 'medium',
//     cursor: 'pointer',

//     _hover: {
//       textDecoration: 'underline',
//     },
//   },
// });
