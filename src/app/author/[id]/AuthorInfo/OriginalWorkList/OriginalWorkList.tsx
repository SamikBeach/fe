import { VStack, VstackProps } from 'styled-system/jsx';
import { searchOriginalWorks } from '@apis/original-work';
import { useQuery } from '@tanstack/react-query';
import {
  OriginalWorkItem,
  OriginalWorkItemSkeleton,
} from '@components/original-work/OriginalWorkItem';
import { useParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { authorOriginalWorkSortAtom } from '@atoms/sort';
import { useLocale } from 'next-intl';
import { Fragment } from 'react';
import { Media } from '@app/media';
import { css } from 'styled-system/css';

interface Props extends VstackProps {}

export default function OriginalWorkList(props: Props) {
  const locale = useLocale();

  const authorOriginalWorkSort = useAtomValue(authorOriginalWorkSortAtom);

  const params = useParams();
  const authorId = Number(params.id);

  const { data: originalWorks = [], isLoading } = useQuery({
    queryKey: ['original-work', authorId, authorOriginalWorkSort],
    queryFn: () =>
      searchOriginalWorks({
        authorId,
        limit: 300,
        sort: authorOriginalWorkSort,
        locale,
      }),
    select: data => data.data.data,
  });

  return (
    <VStack pb="40px" width="100%" {...props}>
      {isLoading
        ? Array(10)
            .fill(0)
            .map((_, index) => (
              <Fragment key={index}>
                <Media greaterThanOrEqual="lg">
                  <OriginalWorkItemSkeleton key={index} />
                </Media>
                <Media lessThan="lg" className={css({ width: '100%' })}>
                  <OriginalWorkItemSkeleton
                    key={index}
                    width="100%"
                    padding="10px"
                    gap="10px"
                  />
                </Media>
              </Fragment>
            ))
        : originalWorks.map(originalWork => (
            <Fragment key={originalWork.id}>
              <Media greaterThanOrEqual="lg">
                <OriginalWorkItem originalWork={originalWork} />
              </Media>
              <Media lessThan="lg" className={css({ width: '100%' })}>
                <OriginalWorkItem
                  originalWork={originalWork}
                  width="100%"
                  padding="10px"
                  originalWorkItemInnerProps={{
                    gap: '10px',
                    isMobile: true,
                  }}
                />
              </Media>
            </Fragment>
          ))}
    </VStack>
  );
}
