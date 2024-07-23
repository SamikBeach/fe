import { WritingServerModel } from '@models/writing';
import { Text, Tooltip } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import ColumnHeader from '../ColumnHeader';
import { Sort, SortType } from '@models/sort';

interface Props {
  setSelectedWritingId: Dispatch<SetStateAction<number | null>>;
  sort: Sort;
  setSort: Dispatch<SetStateAction<Sort>>;
}

export default function useTitleColumnDef({
  setSelectedWritingId,
  sort,
  setSort,
}: Props) {
  const column = useMemo<
    ColumnDef<WritingServerModel, WritingServerModel>
  >(() => {
    return {
      id: 'title',
      accessorFn: row => row,
      size: 270,
      header: () => (
        <ColumnHeader type={SortType.Title} sort={sort} setSort={setSort} />
      ),
      cell: row => {
        const rowValue = row.getValue();

        return (
          <VStack alignItems="start" gap="0px">
            <Tooltip
              content={
                <VStack alignItems="start" gap="0px">
                  <Text weight="bold">{rowValue.title}</Text>
                  <Text
                    className={css({
                      fontSize: '13px',
                    })}
                  >
                    {rowValue.title_in_eng}
                  </Text>
                </VStack>
              }
            >
              <VStack alignItems="start" gap="0px">
                <Text
                  weight="bold"
                  className={css({
                    lineClamp: 1,
                    cursor: 'pointer',

                    _hover: { textDecoration: 'underline' },
                  })}
                  onClick={() => setSelectedWritingId(rowValue.id)}
                >
                  {rowValue.title}
                </Text>
                <Text
                  className={css({
                    fontSize: '13px',
                    lineClamp: 1,
                    cursor: 'pointer',

                    _hover: { textDecoration: 'underline' },
                  })}
                  onClick={() => setSelectedWritingId(rowValue.id)}
                >
                  {rowValue.title_in_eng}
                </Text>
              </VStack>
            </Tooltip>
          </VStack>
        );
      },
    };
  }, [setSelectedWritingId, sort, setSort]);

  return column;
}
