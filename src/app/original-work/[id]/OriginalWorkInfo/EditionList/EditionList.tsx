import { VStack, VstackProps } from 'styled-system/jsx';
import { useAtomValue } from 'jotai';
import { originalWorkEditionSortAtom } from '@atoms/sort';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchEditions } from '@apis/edition';
import {
  EditionItem,
  EditionItemSkeleton,
} from '@components/edition/EditionItem';
import { Fragment } from 'react';
import { Media } from '@app/media';
import { css } from 'styled-system/css';

interface Props extends VstackProps {}

export default function EditonList(props: Props) {
  const originalWorkEditionSort = useAtomValue(originalWorkEditionSortAtom);

  const params = useParams();
  const originalWorkId = Number(params.id);

  const { data: editions = [], isLoading } = useQuery({
    queryKey: ['edition', originalWorkId, originalWorkEditionSort],
    queryFn: () =>
      searchEditions({
        originalWorkId,
        limit: 500,
        sort: originalWorkEditionSort,
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
                  <EditionItemSkeleton key={index} />
                </Media>
                <Media lessThan="lg" className={css({ width: '100%' })}>
                  <EditionItemSkeleton
                    key={index}
                    width="100%"
                    padding="10px"
                    gap="10px"
                  />
                </Media>
              </Fragment>
            ))
        : editions.map(edition => (
            <Fragment key={edition.id}>
              <Media greaterThanOrEqual="lg">
                <EditionItem edition={edition} />
              </Media>
              <Media lessThan="lg" className={css({ width: '100%' })}>
                <EditionItem
                  edition={edition}
                  width="100%"
                  padding="10px"
                  editionItemInnerProps={{ gap: '10px', isMobile: true }}
                />
              </Media>
            </Fragment>
          ))}
    </VStack>
  );
}
