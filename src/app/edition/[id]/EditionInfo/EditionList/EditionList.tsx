import { VStack, VstackProps } from 'styled-system/jsx';
import { useAtomValue } from 'jotai';
import { editionEditionSortAtom } from '@atoms/sort';
import { searchEditions } from '@apis/edition';
import {
  EditionItem,
  EditionItemSkeleton,
} from '@components/edition/EditionItem';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { Media } from '@app/media';
import { css } from 'styled-system/css';

interface Props extends VstackProps {}

export default function EditonList(props: Props) {
  const editionEditionSort = useAtomValue(editionEditionSortAtom);

  const params = useParams();
  const editionId = Number(params.id);

  const { data: editions = [], isLoading } = useQuery({
    queryKey: ['edition', editionId, editionEditionSort],
    queryFn: () =>
      searchEditions({
        editionId,
        limit: 500,
        sort: editionEditionSort,
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
        : editions
            .filter(edition => edition.id !== editionId)
            .map(edition => (
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
