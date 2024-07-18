import { WritingServerModel } from '@models/writing';
import { Text, Tooltip } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

export default function useTitleColumnDef() {
  const router = useRouter();

  const column = useMemo<
    ColumnDef<WritingServerModel, WritingServerModel>
  >(() => {
    return {
      id: 'title',
      header: 'Title',
      accessorFn: row => row,
      size: 500,
      cell: row => {
        const rowValue = row.getValue();

        return (
          <VStack
            alignItems="start"
            gap="0px"
            onClick={() => router.push(`/writing/${rowValue.id}`)}
          >
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
                <Text weight="bold" className={css({ lineClamp: 1 })}>
                  {rowValue.title}
                </Text>
                <Text
                  className={css({
                    fontSize: '13px',
                    lineClamp: 1,
                  })}
                >
                  {rowValue.title_in_eng}
                </Text>
              </VStack>
            </Tooltip>
          </VStack>
        );
      },
    };
  }, [router]);

  return column;
}
