import { AuthorSidePeek } from '@components/AuthorSidePeek';
import { Author } from '@models/author';
import { Avatar, Card, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface AuthorNodeProps extends NodeProps {
  data: Author;
}

function AuthorNode({ selected, data }: AuthorNodeProps) {
  const [isOpenAuthorSidePeek, setIsOpenAuthorSidePeek] = useState(false);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className={css({ visibility: 'hidden' })}
      />
      <Card
        className={css({
          width: '240px',
          cursor: 'pointer',

          '&::after': {
            outline: selected ? '1px solid brown' : 'none',
          },
        })}
        onPointerUp={() => setIsOpenAuthorSidePeek(true)}
      >
        <HStack>
          <Avatar src={data.imageUrl} fallback="니체" radius="full" />
          <VStack gap="0" alignItems="start">
            <Text className={css({ color: 'black' })} weight="bold" size="2">
              {data.name}
            </Text>
            <Text size="1" color="gray">
              {data.nameInKor}
            </Text>
          </VStack>
        </HStack>
      </Card>
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className={css({ visibility: 'hidden' })}
      />
      <AuthorSidePeek
        author={data}
        open={isOpenAuthorSidePeek}
        onOpenChange={setIsOpenAuthorSidePeek}
      />
    </>
  );
}

export default AuthorNode;
