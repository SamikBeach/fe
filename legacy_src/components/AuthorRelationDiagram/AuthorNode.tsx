import { AuthorSidePeek } from 'legacy_src/components/AuthorSidePeek';
import { AuthorServerModel } from 'legacy_src/models/author';
import { Avatar, Text } from '@radix-ui/themes';
import { getCenturyByDate } from 'legacy_src/utils/author';
import classNames from 'classnames';
import { isNil } from 'lodash';
import { useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface AuthorNodeProps extends NodeProps {
  data: AuthorServerModel;
}

function AuthorNode({ selected, data }: AuthorNodeProps) {
  const { name, name_in_kor, image_url, born_date, born_date_is_bc } = data;

  const [isOpenAuthorSidePeek, setIsOpenAuthorSidePeek] = useState(false);

  const bornCentury = isNil(born_date) ? null : getCenturyByDate(born_date);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className={css({ visibility: 'hidden' })}
      />

      <HStack
        className={classNames(
          css({
            width: '240px',
            cursor: 'auto',

            borderRadius: '8px',
            border: selected ? '1px solid brown' : '1px solid lightgray',
            padding: '10px',
            backgroundColor: selected
              ? 'lightgreen'
              : data.activeInfluenced
                ? 'lightblue'
                : data.activeInfluencedBy
                  ? 'lightpink'
                  : data.activeFiltered
                    ? 'purple.200'
                    : 'white',

            animation: 'fadein 0.2s',
          })
        )}
      >
        <Avatar
          src={image_url ?? undefined}
          fallback={name[0]}
          radius="full"
          className={css({ cursor: 'pointer' })}
          onClick={() => setIsOpenAuthorSidePeek(true)}
        />
        <VStack gap="0" alignItems="start">
          <Text
            className={css({
              color: 'black',
              cursor: 'pointer',

              _hover: { textDecoration: 'underline' },
            })}
            weight="bold"
            size="2"
            onClick={() => setIsOpenAuthorSidePeek(true)}
          >
            {name}
          </Text>
          <Text size="1" color="gray">
            {name_in_kor}
          </Text>
        </VStack>
        <Text weight="bold">
          {born_date_is_bc ? '기원전' : ''} {bornCentury}C
        </Text>
      </HStack>

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className={css({ visibility: 'hidden' })}
      />
      <AuthorSidePeek
        authorId={data.id}
        open={isOpenAuthorSidePeek}
        onOpenChange={setIsOpenAuthorSidePeek}
      />
    </>
  );
}

export default AuthorNode;
